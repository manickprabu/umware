'use strict';

angular.module('conceptWidget').service('conceptWidgetServiceCore',
function conceptWidgetServiceCore(
    $uibModal,
    conceptCommonServiceAPI,
    sharedDropdownFactoryCore,
    sharedSingleSelectFactory,
    sharedMultiSelectFactory,
    conceptCommonServiceConfig,
    util,
    sharedDropdownFactoryFirst,
    messageBundleData,
    messageBundleServiceCore,
    conceptWidgetServiceLeadRoles,
    conceptWidgetServiceProposedPlatform,
    conceptWidgetServiceRegions,
    conceptWidgetServiceFileAttachment,
    conceptCommonServiceField,
    conceptCommonServiceFranchise
) {
    var superGenres = [];
    var categoryGenres = [];
    if (conceptCommonServiceConfig.genres() !== null) {
        conceptCommonServiceConfig.genres().forEach(function forEach(superGenre) {
            superGenres.push({
                value: superGenre.id,
                label: superGenre.name || '[NO NAME]'  //since there is name issue we have default name
            });
        });
    }

    this.plannedDistributionMedia = {};
    if( conceptCommonServiceConfig.config('distributionMedias') != null) {
        conceptCommonServiceConfig.config('distributionMedias').forEach(angular.bind(this, function(medias) {
            this.plannedDistributionMedia[medias.id] = medias.name;
        }));
    }

    this.plannedPeripherals = [];
    if( conceptCommonServiceConfig.config('plannedPeripherals') != null) {
        conceptCommonServiceConfig.config('plannedPeripherals').forEach(angular.bind(this, function(peripheral) {
            var obj = {id:peripheral.id, label:peripheral.nameEN, peripheral:peripheral}
            this.plannedPeripherals.push(obj);
        }));
    }

    //plannedFeatures
    this.plannedFeatures = [];
    if(conceptCommonServiceConfig.config('plannedFeatures') !=null) {
        conceptCommonServiceConfig.config('plannedFeatures').forEach(angular.bind(this, function(item) {
            var plannedFeatures = {id:item.id, value:item.id,  label:item.nameEN, feature:item};
            this.plannedFeatures.push(plannedFeatures);
        }));
    }


    this.languages = {};
    if (conceptCommonServiceConfig.config('languages') !== null) {
        conceptCommonServiceConfig.config('languages').forEach(angular.bind(this, function forEach(language) {
            this.languages[language.isocode] = language.name || language.isocode;
        }));
    };

    var franchises = {};
    if (conceptCommonServiceFranchise.franchises() !== null) {
        conceptCommonServiceFranchise.franchises().forEach(function forEach(franchise) {
            franchises[franchise.id] = franchise.name;
        });
    };

    function dropdownWrapper(name) {
        var getterSetter = conceptCommonServiceField.field(name).value;
        return function (value) {
            if (value !== undefined) {
                getterSetter({id : value});
            }
            return (getterSetter() || {}).id;
        };
    }

    // Concept types for radio options.
    this.type = sharedSingleSelectFactory(
        messageBundleData.applyBundles(
            'conceptTypes',
            conceptCommonServiceConfig.config('conceptTypes')
        ), {
            value: conceptCommonServiceField.field('conceptType').value
        });

    // Concept roles
    this.leadRoles = conceptWidgetServiceLeadRoles.instance;
    this.leadRoles2 = conceptWidgetServiceLeadRoles.instance;

    // Planned Platforms
    this.proposedPlatform = conceptWidgetServiceProposedPlatform.instance;

    // List for category
    //update method sub- genre
    this.updateSuperGenre = function (superGenreDropdown) {
        //disable only when parent has alreay value
        if(conceptCommonServiceField.field('superGenre').value()) {
            this.categoryGenre.disable(false);
        }

        // re-initialize categoryGenres
        categoryGenres = [];

        conceptCommonServiceConfig.genres().forEach(function forEach(superGenre) {
            // if super genres match
            if(superGenre.id === (conceptCommonServiceField.field('superGenre').value() || {}).id) {
                // build from json obj from key values
                categoryGenres = superGenre.categoryGenres.map(function(categoryGenre) {
                    return {
                        value: categoryGenre.id,
                        label: categoryGenre.name || '[NO NAME]' //since there is name issue we have default name
                    };
                });

                return;
            }
        });

        // assign
        this.categoryGenre.list(categoryGenres);
    };


    this.categoryGenre = sharedDropdownFactoryCore({}, {
        value: dropdownWrapper('categoryGenre'),
        placeholder: 'Select a category genre',
        disable: true
    });
    this.superGenre = sharedDropdownFactoryCore(
        superGenres, {
            value: dropdownWrapper('superGenre'),
            placeholder: 'Select a super genre',
            update: angular.bind(this, this.updateSuperGenre)
    });

    //pre-pupulate sub-genre once just of parent genre alreay has value
    this.updateSuperGenre();

    this.franchise = {
        core: sharedDropdownFactoryCore(franchises, {
            placeholder: 'Select a franchise',
            search: true,
            value: dropdownWrapper('franchise')
        }),
        first: sharedDropdownFactoryFirst('Add New Franchise', function firstClick() {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/components/concept-proposal/partial/add-franchise-modal.html',
                controller: 'addFranchiseModalController',
                controllerAs: 'addFranchiseModalCtrl',
                size: 'md',
                resolve: {
                    items: function() {
                        return 'test';
                    }
                }
            });
        })
    };


    //businessModel
    this.businessModel =
        messageBundleData.applyBundles(
            'businessModels',
            conceptCommonServiceConfig.config('businessModels')
        );

    //AGE
    this.age = sharedDropdownFactoryCore(
        messageBundleData.applyBundles(
            'targetAges',
            conceptCommonServiceConfig.config('targetAges')
        ), {
        placeholder: 'Select an option'
    });

    // Dropdown update functions
    [
        ['age', 'proposal.targetAge']
    ].forEach(angular.bind(this, function dropdownUpdate(data) {
        var prop = data[0];
        var fieldName = data[1] || prop;
        this[prop].value(conceptCommonServiceField.field(fieldName).value);
    }));


    //Obligatory Compliance Check (OCC) Page
    this.occ = sharedSingleSelectFactory({
        No: 'No',
        Yes: 'Yes',
        Unconfirmed: 'Unconfirmed'
    }, {
        value: conceptCommonServiceField.field('compliance.occCompliance').value
    });

    // Internal Review Concept Ratings
    this.conceptRatings = sharedSingleSelectFactory(
        messageBundleData.applyBundles(
            'ratings',
            conceptCommonServiceConfig.config('ratings')
        ), {
        value: conceptCommonServiceField.field('concept.overview.internalReview.Rating').value
    });


    this.virtualcurrency = sharedSingleSelectFactory({
        No: 'No',
        Yes: 'Yes',
        Unconfirmed: 'Unconfirmed'
    }, {
        value: conceptCommonServiceField.field('compliance.virtualCurrencyCompliance').value
    });

    this.regions = conceptWidgetServiceRegions.instance;
    conceptCommonServiceAPI.config().then(conceptWidgetServiceRegions.resolution);

    //CREATE DYNAMIC FIELD

    // Todo:
    // 1 - All these types of document attachment should *always* be set up.
    // 2 - The file attachment property doesn't need to be available as a function from outside.
    // 3 - This should be moved into a separate widget service where these are set up, to keep
    // with the pattern.
    this.fileAttachment = function(fields) {

        angular.forEach(fields, angular.bind(this, function(fieldName, key) {
            this[key] = new conceptWidgetServiceFileAttachment({
                value: conceptCommonServiceField.field(fieldName).value
            });
        }));
    };

    this.fileAttachment({
        'attachments': 'proposal.attachments',
        'gameDesignDocumentEN': 'proposal.gameDesignDocuments[EN]',
        'gameDesignDocumentJA': 'proposal.gameDesignDocuments[JA]'
    });

    //Create Yes No sharedSingleSelectFactory instance and for requested field
    this.createYesNoField = function(fieldName, updateCallBack) {

        return sharedSingleSelectFactory([ {label:'Yes', value: 'yes'}, {label:'No', value: 'no'} ], {
            //override by custom method
            value: function (id) {
                var value = conceptCommonServiceField.field( fieldName ).value;
                //check if id not undefined
                if (id !== undefined) {
                    value(id === 'yes');
                }
                /*
                *  Here for true and false, radio button accepts Yes & No
                *  and one page load, there is no values selected so it would be blank
                */
                var results = '';
                switch(value()) {
                    case true:
                        results =  'yes'
                        break;
                    case false:
                        results = 'no'
                        break;
                };
                return results;

            },
            update: updateCallBack
        });
    }


});
