// Todo: I can see a problem in that I'm not exactly sure what this service should do.
angular.module('conceptCommon').service('conceptCommonServiceManager',
function conceptCommonServiceManager(
    $q,
    conceptCommonServiceField,
    conceptCommonFactoryDTO,
    conceptCommonServicePageFields
) {
    var data = {};

    // Get the DTO, passing the concept
    function dto(apiConceptObject) {
        if (apiConceptObject !== undefined) {
            data.dto = conceptCommonFactoryDTO(apiConceptObject);
        }
        return data.dto;
    }

    // Get the fields for a DTO
    function fields(dtoResponse, noupdate) {
        // Get an array of Field objects for a DTO
        return conceptCommonServiceField.fields(dtoResponse, noupdate);
    }

    // Updates the DTO based on the existing field values.
    function updateDTO() {
        return conceptCommonServiceField.updateDTO(dto());
    }

    // Wraps the validate function because we need this DTO from this service.
    function validate() {
        updateDTO();
        var promise = conceptCommonServiceField.validate(dto());
        //update required fields for page validation;
        promise.then(function() {
            conceptCommonServicePageFields.validateRequireFields();
        })
        return promise;
    }

    // Assign trigger update functions.
    function triggerUpdate() {
        // console.log('trigger update')
        // fields().forEach(function forEach(field) {
        //     if (field.triggerUpdate()) {
        //         field.update(validate);
        //     }
        // });
    }

    // Init function, include endpoint call and associated callbacks.
    function init() {
        return conceptCommonServiceField.init().then(triggerUpdate);
    }

    // Fetch concept by conceptId.
    function details(conceptId) {
        return dto({}).fetch(conceptId).then(function fetch(dtoResponse) {
            return conceptCommonServiceField.validate(dtoResponse).then(function then() {
                fields(dtoResponse, true);
                return dtoResponse;
            });
        });
    }

    // Saves the DTO.
    function save() {
        // Update the dto with the field array values then save
        updateDTO();

        return dto().save();
    }

    // Submit the DTO.
    function submit() {
        // Operation is asynchronous and requires an output promise.
        var deferred = $q.defer();

        // Check if fields are valid.
        if (conceptCommonServiceField.invalid().length === 0) {
            // If fields are valid...

            // Update the dto with the field array values then save
            updateDTO();

            // Resolve with submission promise.
            dto().submit()
                .then(deferred.resolve)
                .catch(deferred.reject);
        } else {
            // Reject if invalid.
            deferred.reject();
        }

        // Returning promise.
        return deferred.promise;
    }

    function reset() {
        fields().forEach(function forEach(field) {
            field.reset();
        });
        return dto({});
    }

    // Expose core concept object (dto object) to outside the world
    function concept() {
        return dto().data;
    }

    conceptCommonServiceField.triggerUpdate(validate);

    /* eslint key-spacing: 0 */
    angular.extend(this, {
        concept : concept,
        dto     : dto,
        details : details,
        init    : init,
        save    : save,
        submit  : submit,
        reset   : reset,
        triggerUpdate: triggerUpdate
    });
});
