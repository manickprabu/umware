/*
    this is helper service to planned feature module 
    which setter/getter value object for ui / field.value(dto object)
*/
angular.module('conceptWidget').service('conceptWidgetServicePlannedFeatures',
function conceptWidgetServicePlannedRegions( 
    conceptWidgetServiceCore, 
	conceptCommonServiceField, 
	sharedMultiSelectFactory,
	conceptOverviewModel
	) {	   

	/// Fields list for planned features
	this.fields = conceptOverviewModel.fields();
    this.field = conceptCommonServiceField.field(this.fields.plannedFeatures);	

	this.plannedFeatures = function(filteredList) {
		return sharedMultiSelectFactory(
        filteredList, {
            value: angular.bind(this, function (ids) {            	
                // Getter/setter reference.
                var value = conceptCommonServiceField.field(this.fields.plannedFeatures).value;
                if (ids !== undefined) {
                    // When setting, ids are populated.
                    value(ids.map(function (id) {
                    	var feature = conceptWidgetServiceCore.plannedFeatures.filter(angular.bind(this, function(item) {
                    		return (item.id == id)
                    	}));
                    	return feature[0];
                    }));                    
                }
                // // Getter, which maps array of ids.
                return (value() || []).map(function (feature) {
                    return feature.feature.id;
                });
            })
    	});  		
	}	  
});     