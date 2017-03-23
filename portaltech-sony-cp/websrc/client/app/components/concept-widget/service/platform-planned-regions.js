angular.module('conceptWidget').service('conceptWidgetServicePlannedRegions',
function conceptWidgetServicePlannedRegions( conceptOverviewModel, conceptCommonServiceConfig, conceptCommonServiceField, AppConfig) {

    //run init field settings
    this.init = function(platformName) {
        this.fields = conceptOverviewModel.fields(platformName);
    }
    
    this.getPlannedRegions = function(fieldName) {
        this.init();
        this.field = conceptCommonServiceField.field(fieldName);

        var plannedRegions = conceptCommonServiceConfig.config('regions').map(function (region) {
            return {code: region.code, name : region.name};
        });
        
        //pre set selected value
        var val = this.field.value() || [];
        if(val) {
            val.forEach(angular.bind(this, function(value) {

                plannedRegions.forEach(angular.bind(this, function(region) {

                    var releaseDate = AppConfig.formatToShortDate(value.releaseDate.date) || value.releaseDate.quarterTime.quarter + '-' + value.releaseDate.quarterTime.year;                   
                    
                    if(region.code == value.region.code && releaseDate) {
                        region.releaseDate = value.releaseDate;
                        region.value = releaseDate;
                    }
                }));

            }));
        }

        this.plannedRegionsData = plannedRegions;
        return plannedRegions;
    }
 
    
    this.updateField = function(fieldName) {
        this.field = conceptCommonServiceField.field(fieldName);
        this.init();
        var releaseDates = [];

        this.plannedRegionsData.forEach(function(region) {
            // If formatted date is a Date object
            if(region.formattedDate) {
                var item = {
                    "releaseDate":{
                        "date": AppConfig.formatDate(region.formattedDate),
                    },
                    "region":{
                        name : region.name,
                        code : region.code
                    }
                };
                // Push object to array to set field value
                releaseDates.push( item );

            }else if(region.releaseDate) {
                // Quarter date required object properties
                var item = {
                    "releaseDate": region.releaseDate,
                    "region":{
                        name : region.name,
                        code : region.code
                    }
                };

                releaseDates.push( item );
            } 

        });
        // Set the filed value after iteration
        this.field.value(releaseDates);
    }

});
