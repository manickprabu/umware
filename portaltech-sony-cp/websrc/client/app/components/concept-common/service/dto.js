angular.module('conceptCommon').service('conceptCommonServiceDTO',
function conceptCommonServiceDTO(conceptCommonFactoryMapper) {
    // Updates the DTO object based on the field objects.
    function update(dto, fields, mapperfilterFunction) {
        fields.filter(function (field) { return field.active(); })
            .forEach(angular.bind(this, function forEachField(field) {
                 
            conceptCommonFactoryMapper(
                dto.data,
                field.name(),
                field.value(),
                mapperfilterFunction
            );
        }));
    }

    // Expose properties.
    angular.extend(this, {
        update: update
    });
});
