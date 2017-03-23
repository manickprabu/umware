angular.module('conceptCommon').service('conceptCommonServiceField',
function conceptProposalServiceField(
    conceptCommonFactoryMapper,
    conceptCommonFactoryField,
    conceptCommonServiceAPI,
    conceptCommonServiceDTO,
    messageBundleServiceCore
) {
    var data = {
        fields: [],
        triggerUpdate: function tu() {}
    };

    // Generates a filter function based on a field object and field data.
    function filter(field) {
        return function filterFields(fieldData) {
            return field.name() === fieldData.fieldCode;
        };
    }

    // An array of all fields with this name.
    function findByName(name) {
        return data.fields.filter(function filterFields(field) {
            return field.name() === name;
        })[0];
    }

    function triggerUpdate(fnc) {
        if (fnc !== undefined) {
            data.tu = fnc;
        }
        return data.tu;
    }

    // Creates a field object if it doesn't already exist.
    function findAndCreate(name) {
        // Checks for the field object by name.
        var field = findByName(name);

        // Creates field objects if they don't exist.
        if (field === undefined) {
            data.fields.push(field = conceptCommonFactoryField(name));
            field.label(messageBundleServiceCore.message('concept', field.name() + '.name'));
            field.information(
                messageBundleServiceCore.message('concept', field.name() + '.information')
            );
            field.update(function () {
                if (field.triggerUpdate()) {
                    triggerUpdate()();
                }
            });
        }

        return field;
    }

    // Update field objects
    function update() {
        // Updates field objects with visibility and trigger updates.
        data.response.formFields.forEach(angular.bind(this, function formFields(fieldData) {
            var field = findAndCreate(fieldData.fieldCode);
            field.visible(fieldData.visible);
            field.triggerUpdate(fieldData.triggerUpdate);
        }));

        // Updates field objects with required status.
        data.response.validationFields.forEach(angular.bind(this,
        function validationFields(fieldData) {
            var field = findAndCreate(fieldData.fieldCode);
            field.required(fieldData.required);
            field.requiredMessage(fieldData.requiredMessage);
        }));

        // Handle non-existent form/validation fields.
        data.fields.forEach(angular.bind(this, function formFields(field) {
            field.visible(data.response.formFields.filter(filter(field)).length);
            field.required(data.response.validationFields.filter(filter(field)).length > 0);
        }));
    }

    // Updates the data object based on the response.
    function handleResponse(response) {
        data.response = response.data;
        update();
        return data;
    }

    // Init call
    function init() {
        return conceptCommonServiceAPI.init().then(handleResponse);
    }

    // Validate call
    function validate(dto) {
        return conceptCommonServiceAPI.validate(dto.data).then(handleResponse);
    }

    function mapperfilterFunction(prop, id, obj) {
        return (({
            plannedPlatforms: function plannedPlatforms() {
                return id === (obj.platform || {}).name;
            },
            gameDesignDocuments: function gameDesignDocuments() {
                return id.toLowerCase() === obj.language.isocode;
            }
        })[prop] || function otherwise() { return true; })();
    }

    // Generate field object array using field data and dto.
    function fields(dto, noupdate) {
        if (dto !== undefined) {
            data.fields.filter(function (field) { return field.active(); })
            .forEach(angular.bind(this, function forEach(field) {
                field.value(conceptCommonFactoryMapper(
                    dto.data,
                    field.name(),
                    undefined,
                    mapperfilterFunction
                ), {noupdate: noupdate});
            }));
        }

        return data.fields;
    }

    function updateDTO(dto) {
        return conceptCommonServiceDTO.update(dto, fields(), mapperfilterFunction);
    }

    // Return an array of all invalid fields.
    function invalid() {
        // Runs a filter against all fields, returning them if invalid.
        return data.fields.filter(function filter(field) {
            var invalidField = field.empty() && field.required();
            if (invalidField) {
                // Sets the error message if invalid.
                field.getRequiredMessage( messageBundleServiceCore.message('concept', field.name() + '.required') );
            } else {
                field.getRequiredMessage('');
            }
            return invalidField;
        });
    }

    // Expose the functions we want exposed.
    angular.extend(this, {
        init: init,
        validate: validate,
        fields: fields,
        field: findAndCreate,
        updateDTO: updateDTO,
        invalid: invalid,
        triggerUpdate: triggerUpdate
    });
});
