
angular.module('conceptWidget').service('conceptWidgetServiceLanguageDistribution',
function conceptWidgetServiceLanguageDistribution( 
        $filter,
        conceptOverviewModel, 
        conceptWidgetServiceCore, 
        conceptCommonServiceField, 
        sharedMultiSelectFactory, 
        sharedDropdownFactoryCore
    ) {

        this.init = function(platformName) {
            this.fields = conceptOverviewModel.fields(platformName);
        }

        //create plannedDistributionMedia instance for sharedMultiSelectFactory
        //override getter - to provide date to UI component
        //override setter - to set field.value();
        this.getPlannedDistributionMedia = function(fieldName) {

            var plannedDistributionMedia = sharedMultiSelectFactory(
                conceptWidgetServiceCore.plannedDistributionMedia, {
                    value: angular.bind(this, function (ids) {
                        // Getter/setter reference.
                        var value = conceptCommonServiceField.field(fieldName).value;
                        if (ids !== undefined) {
                            // When setting, ids are populated.
                            value(ids.map(function (id) {
                                return {
                                    id: id,
                                    name: conceptWidgetServiceCore.plannedDistributionMedia[id]
                                };
                            }));
                        }

                        // Getter, which maps array of ids.
                        return (value() || []).map(function (media) {
                            return media.id + '';
                        });
                    })
                });

            return plannedDistributionMedia;
        }
    
        //create plannedLanguage instance for sharedDropdownFactoryCore
        //and override getter & setter;
        this.getPlannedLanguages = function(fieldName) {

            var plannedLanguages = sharedDropdownFactoryCore(conceptWidgetServiceCore.languages, {
                value: angular.bind(this, function (_value) {
                    var value = conceptCommonServiceField.field(fieldName).value;
                    //Setting field.value when new language added
                    if(_value) {
                        value(_value.map(function(isocode){
                            return {
                                isocode: isocode,
                                //get country Name based on isocode
                                name: $filter('countryName')(isocode)
                            }
                        }))
                    }

                    //return list of id for UI
                    return (value() || []).map(function(language){
                        return language.isocode;
                    });
                }),
                search: true,
                multiSelect: true
            });

            return plannedLanguages;
        }

});
