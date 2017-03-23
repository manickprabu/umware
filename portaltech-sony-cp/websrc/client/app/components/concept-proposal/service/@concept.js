// Service for concept proposal
angular.module('conceptProposal').service('conceptProposalServiceConcept',
function conceptProposalServiceConcept(
    $q,
    conceptCommonServiceAPI,
    conceptProposalServiceField,
    documentsService,
    conceptProposalPlatformDataModel,
    User,
    messageBundleServiceCore,
    conceptLocalStorage,
    conceptProposalFactoryFieldKeyMapper
) {    
    return;
    var data = {
        message: {},
        fields: [],
        list: [],
        api: {}
    };
    var role = '';
    var updates = {
        fields: angular.bind(this, function updateFields(response) {
            console.deprecated('Function has been moved to conceptCommonServiceField.');
            function filter(field) {
                return function filterFields(fieldData) {
                    return field.name() === fieldData.fieldCode;
                };
            }

            // Updates field objects with visibility and trigger updates.
            response.data.formFields.forEach(angular.bind(this, function formFields(fieldData) {
                var field = this.field(fieldData.fieldCode);
                field.visible(fieldData.visible);
                field.triggerUpdate(fieldData.triggerUpdate);
            }));

            // Updates field objects with required status.
            response.data.validationFields.forEach(angular.bind(this,
            function validationFields(fieldData) {
                var field = this.field(fieldData.fieldCode);
                field.required(fieldData.required);
                field.requiredMessage(fieldData.requiredMessage);
            }));

            // Handle non-existent form/validation fields.
            data.fields.forEach(angular.bind(this, function formFields(field) {
                field.visible(response.data.formFields.filter(filter(field)).length);
                field.required(response.data.validationFields.filter(filter(field)).length > 0);
            }));
        }),
        fieldText: function allSuccess() {
            data.fields.forEach(function forEachFields(field) {
                field.label(data.message[field.name() + '.name']);
                field.information(data.message[field.name() + '.information']);
            });
        },

    };

    this.pageFields = function(page) {
        return data.fields.filter(function filter(field) {
            return conceptProposalServicePageFields[page].indexOf(field.name()) > -1;
        });
    };

    //dinamyc add/remove required field for validation
    this.validateRequireFields = function() {
        var page = 0;
        [
            'proposal.attachments',
            'proposal.gameDesignDocuments[EN]',
            'proposal.gameDesignDocuments[JA]'
        ].forEach(angular.bind(this, function(key) {
            var found = conceptProposalServicePageFields[page].indexOf(key);
            if (found > -1) {
                conceptProposalServicePageFields[page].splice(found, 1);
            }

            if(this.field(key).required()) {
                conceptProposalServicePageFields[page].push(key);
            }
        }));

    }

    // Todo: find out what this is for and why it's necessary. By the name it implies a promise
    // should be used or it should be a function.
    this.isInitialized = false;

    // Runs the validate endpoint on a concept and loads the Field objects.
    // Returns a promise with $http response data.
    this.validate = angular.bind(this, function validate() {
        // Call the validate API and update the fields and labels when complete.
        return conceptCommonServiceAPI
            .validate(this.api())
            .then(angular.bind(this,
        function post(response) {
            updates.fields(response);
            updates.fieldText();
            this.validateRequireFields();
        }));
    });

    this.loadConfig = function loadConfig() {
        return conceptCommonServiceAPI.config().then(function config(response) {
            data.config = response.data;
            return data.config;
        });
    };

    // Initialisation of API object.
    this.initialise = angular.bind(this, function initialise() {
        return $q.all([
            User.currentUser(),
            conceptCommonServiceAPI.init().then(angular.bind(this, function init(response) {
                updates.fields(response);

                data.fields.forEach(angular.bind(this, function forEachFields(field) {
                    if (field.triggerUpdate()) {
                        field.update(this.validate);
                    }
                }));
            })),
            conceptCommonServiceAPI.config().then(
            function config(response) {
                data.config = response.data;
            }),
            this.fetchFranchises(),
            conceptCommonServiceAPI.genres().then(
            function config(response) {
                data.genres = response.data.superGenres;
            })
        ]).then(function allSuccess() {
            updates.fieldText();
            // initialize has completed
            this.isInitialized = true;
        });
    });
    this.fetchFranchises = function () {
        return conceptCommonServiceAPI.getFranchises().then(
            function getFranchises(response) {
                data.franchises = response.data.franchises;
            });
    };
    // this.messageBundleGroups = function () {
    //     return messageBundleServiceCore.resolve('concept').then(
    //     function messageBundleGroups(messageBundle) {
    //         data.message = messageBundle;
    //         return data.message;
    //     });
    // }

    // Todo: This is no longer relevant.
    this.role = function getSetRole(value) {
        if (value !== undefined) {
            if (typeof value !== 'string') {
                throw new Error([
                    'conceptProposalServiceConcept.role: Setting invalid role.',
                    'Expecting a string, got ' + (typeof value)
                ].join(''));
            }
            role = value;
        }
        return role;
    };

    this.message = function message(name) {
        return data.message[name];
    };
    this.config = function config(name) {
        return typeof data.config === 'undefined' ? null : data.config[name];
    };
    this.franchises = function franchises() {
        return typeof data.franchises === 'undefined' ? null : data.franchises;
    };
    this.genres = function genres() {
        return typeof data.genres === 'undefined' ? [] : data.genres;
    };

    // Handles the API call where objectData is a property of the response, extending the API
    // object with the data.
    // This assumes that all necessary data changes would be overwritten properly by the API
    // response.
    // Todo: this can be removed once the save/commit have been removed.
    function handleObjectResponse(response) {
        return data.api = angular.extend(data.api, response.data.objectData);
    };

    // Todo: This function does two entirely different things.
    // This needs to be two functions.
    // If necessary, this can be two functions which are joined by a single function,
    // but a case needs to be found for that, since the save draft and submission buttons
    // are entirely separate.
    // Todo: The submission and save have been into the manager service. Need to safely remove
    // and hook up the manager service.
    this.commit = angular.bind(this, function save(page, canSubmit) {

        // This saves a draft if the required fields are not empty.
        var fields, valid = true, pageId = -1, promise;

        //on submit: do validation check all 3 pages
        if(canSubmit) {
            for(var i = 0; i<=page; i++) {
                fields = this.pageFields(i);

                fields.forEach(function fieldsForEach(field) {
                    if (field.empty() && field.required()) {
                        valid = false;

                        //flag errored pageId to routing
                        pageId = (pageId == -1) ? i : pageId;
                        field.getRequiredMessage(data.message[field.requiredMessage()]);
                    } else {
                        field.getRequiredMessage('');
                    }
                });
            }

            if(valid && fields && fields.length) {
                promise = conceptCommonServiceAPI.submit(this.api());
            } else {
                valid = false;
            }


        } else { // on save: just save all data exist in UI
            console.deprecated('Concept service commit is being used when we should be using the manager service for save.');
            promise = conceptCommonServiceAPI.save(this.api());
        }

        //to keep saved conceptId throughout concept
        if(promise) {

            promise.then(handleObjectResponse);
        }

        return {valid:valid, pageId:pageId, promise:promise};
    });

    // Todo: Moved into manager service. Need to safely remove.
    this.save = function () {
        console.deprecated('Concept service save is being used when we should be using the manager service.');
        return conceptCommonServiceAPI.save(this.api()).then(handleObjectResponse);
    };

    this.upload = function (language, file, callBack){
        documentsService.api(language, file).then(function(reponce) {
            if(typeof callBack ==  'function') {
                callBack.call(null, reponce.data);
            }
        });
    },


    this.requiredNotEmpty = angular.bind(this, function requiredNotEmpty(page) {
        // Checks whether all fields are required and not empty.
        // Todo: DRY it up. It repeats a lot of functionality from the save function.
        var filledField = true;

        var fields = this.pageFields(page);
        fields.forEach(function fieldsForEach(field) {
            if (field.empty() && field.required()) {
                filledField = false;
            }
        });
        return filledField;
    });


    // Nasty hack to connect field objects into field directives.
    // Specifically, this updates the Field objects when the fields change.
    // Todo: Include a way for the partial fields to be updated by the field objects.
    // Todo: Safely remove this function.
    this.update = angular.bind(this, function update(name) {
        // Update field object based on directive.
        return angular.bind(this, function fnc(value) {
            this.field(name).value(value);
        });
    });

    // Returns a field given a field name
    this.field = function getField(name) {
        if (name === undefined) {
            throw new Error([
                'conceptCommonServiceField.field(name): argument is undefined.',
                'Expecting field name string.'
            ].join(' '));
        }

        // Checks for the field object by name.
        var list = data.fields.filter(function filterFields(field) {
            return field.name() === name;
        });

        // Creates field objects if they don't exist.
        if (list.length === 0) {
            var _field = list[0] = conceptProposalServiceField.create(name);
            _field.label(data.message[_field.name() + '.name']);
            _field.information(data.message[_field.name() + '.information']);

            data.fields.push(_field);
        }

        return list[0];
    };
    this.fields = function getFields() {
        return data.fields;
    };

    this.list = function list() {
        return conceptCommonServiceAPI.list().then(function (response) {
            return response.data;
        });
    };

 	this.localStore = function localStore() {
        return JSON.parse(localStorage.savedDraft);
    }

    // Todo: Moved into manager service. Need to safely remove.
    this.detail = angular.bind(this, function detail(id) {
        // Start a fetch process.
        return conceptCommonServiceAPI.details(id).then(angular.bind(this, function (response){
            // Fetch the record data.
            // Set up the API object.
            this.reset();

            data.api = angular.copy(response.data);

            // Set the Field object values against the API data.
            // Stick with a specific set of fields now and handle the rest later.
            // Todo: One should be able to loop all available fields for this.
            [
                'conceptType',
                'partnerRoles',
                'nameEN',
                'nameJA',
                'codeNameEn',
                'superGenre',
                'categoryGenre',
                'franchise',
                'proposal.plannedPlatforms'
            ].forEach(angular.bind(this, function (name) {
                var field = this.field(name);
                field.value(conceptProposalFactoryFieldKeyMapper(data.api, field.name()));
            }));
            return response.data;
        }));
    });

    this.reset = function reset() {
        data.api = {};
        data.fields.forEach(function (field) {
            field.reset();
        });
    };

    // Todo: Safely remove. This functionality should be built into the conceptCommon module.
    this.api = angular.bind(this, function api() {
        var concept = angular.copy(data.api);
        // Assign direct correlation fields
        // Todo: Replace hardcoded fields with Field objects
        [
            'nameEN',
            'nameJA',
            'codeNameEn',
            'codeNameJA',
            'conceptType',
            'leadRoles'
        ].forEach(angular.bind(this, function assignFields(fieldCode) {
            if (this.field(fieldCode).value()) {
                concept[fieldCode] = this.field(fieldCode).value();
            }
        }));

        // Ultimately this is how all fields should be saved.
        // [
        //     'proposal.plannedPlatforms'
        // ].forEach(angular.bind(this, function (fieldCode) {
        //     conceptProposalFactoryFieldKeyMapper(concept, fieldCode, this.field(fieldCode).value());
        // }));

        //lead roles is an array
        concept.leadRoles =
            concept.leadRoles !== this.message('leadRoles.both') ? [concept.leadRoles] : this.config('partnerRoles');

        // Todo: DRY it up.
        if (!concept.proposal) {concept.proposal = {};}
        concept.proposal.externalFeedbackRequired =
            this.field('proposal.externalFeedbackRequired').value();
        if (!concept.compliance) {concept.compliance = {};}
        [
            'occComplianceComment',
            'virtualCurrencyComplianceComment',
            'legalDisclaimerAccepted'
        ].forEach(angular.bind(this, function (name) {
            concept.compliance[name] = this.field('compliance.' + name).value();
        }));

        // Radio Buttons
        // Todo: DRY it up.
        if (this.field('compliance.occCompliance').value()) {
            concept.compliance.occCompliance =
                this.field('compliance.occCompliance').value();
        }
        if (this.field('compliance.virtualCurrencyCompliance').value()) {
            concept.compliance.virtualCurrencyCompliance =
                this.field('compliance.virtualCurrencyCompliance').value();
        }
        // superGenre, categoryGenre

        // Checkboxes
        if (this.field('proposal.regions').value()) {
            concept.proposal.regions = this.field('proposal.regions').value().map(
            function map(region) {
                return {
                    code: region
                };
            });
        }

        //File Attachment
        concept.proposal.attachments = [];
        concept.proposal.gameDesignDocuments = [];
        ['proposal.attachments'].forEach(angular.bind(this, function(key){
                if(this.field(key).value()) {
                    concept.proposal.attachments = this.field(key).value(); //array
                }
            }));
        [   'proposal.gameDesignDocuments[EN]',
            'proposal.gameDesignDocuments[JA]'
        ].forEach(angular.bind(this, function(key){
                if(this.field(key).value()) {
                    var data = concept.proposal.gameDesignDocuments;
                    data = [].concat(data, this.field(key).value());
                    concept.proposal.gameDesignDocuments = data;
                }
            }));
        //End of file Attachment


        // Start plannedPlatforms
        var selectedPlatforms = this.field('proposal.plannedPlatforms').value();
        var available = this.config('platforms');
        concept.proposal.plannedPlatforms = (this.field('proposal.plannedPlatforms').value() || [])
        .map(angular.bind(this, function (key) {
            return conceptProposalPlatformDataModel.getPlatformAPIObject(available.filter(function(item) {
                return item.id === key;
            })[0], this);
        }));
        //End of plannedPlatforms



        //render plannedCompetitorPlatforms
        concept.proposal.plannedCompetitorPlatforms = this.field('proposal.plannedCompetitorPlatforms').render();

        // Dropdowns
        concept.proposal.targetAge = this.field('proposal.targetAge').value();
        [
            'franchise',
            'superGenre',
            'categoryGenre'
        ].forEach(angular.bind(this, function (fieldName) {
            concept[fieldName] = this.field(fieldName).value();
        }));

        // Naming superGenre/categoryGenre when id is provided.
        this.genres().filter(function (superGenre) {
            return superGenre.id === (concept.superGenre || {}).id;
        }).forEach(function (superGenre) {
            concept.superGenre.name = superGenre.name;
            concept.categoryGenre.name = superGenre.categoryGenres.filter(function (categoryGenre) {
                return categoryGenre.id === concept.categoryGenre.id;
            })[0].name;
        });

        // partnerRoles, proposal.plannedPlatforms,
        return concept;
    });
});
