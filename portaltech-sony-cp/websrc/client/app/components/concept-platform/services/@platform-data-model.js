'use strict';

// Service for concept proposal
angular.module('conceptProposal').service('conceptProposalPlatformDataModel',
    function conceptProposalPlatformDataModel(
        $q,
        conceptCommonServiceAPI,
        conceptProposalServiceField,
        sharedSingleSelectFactory, $filter,
        AppConfig
    ) {
        var service = this, configPlatform;       

        //dynamic add/remove fields on conceptProposalServicePageFields object
        this.updateServicePageFields = function(platforms) {
            var fieldObject = conceptProposalServicePageFields[1];
            fieldObject = ['proposal.plannedPlatforms'];

            platforms.forEach(angular.bind(this, function(platform){
                var fieldList = this.getFieldList(platform);

                for (var field in fieldList) {
                    fieldObject.push( fieldList[field] );
                }
            }));
            conceptProposalServicePageFields[1] = fieldObject;
        };

        function GetFieldList(key) {
            var fields =  {   
                    'exclusiveAtLaunch'     : 'proposal.plannedPlatforms[#PLATFORM#].exclusiveAtLaunch',
                    'plannedRegions'        : 'proposal.plannedPlatforms[#PLATFORM#].plannedRegions',
                    'plannedLanguages'      : 'proposal.plannedPlatforms[#PLATFORM#].plannedLanguages',
                    'businessModel'         : 'proposal.plannedPlatforms[#PLATFORM#].businessModel',
                    'offlineMultiplayer'    : 'proposal.plannedPlatforms[#PLATFORM#].offlineMultiplayer',
                    'onlineMultiplayer'     : 'proposal.plannedPlatforms[#PLATFORM#].onlineMultiplayer',
                    'dlcIntension'          : 'proposal.plannedPlatforms[#PLATFORM#].dlcIntension',
                    'plannedPeripherals'    : 'proposal.plannedPlatforms[#PLATFORM#].plannedPeripherals',
                    'plannedFeatures'       : 'proposal.plannedPlatforms[#PLATFORM#].plannedFeatures',
                    'plannedDistributionMedia': 'proposal.plannedPlatforms[#PLATFORM#].plannedDistributionMedia'
            };
            angular.extend(this, fields);

            for (var field in this) {
                this[field] = this[field].replace('#PLATFORM#', key); 
            }
        }

        var _fieldListObject = {};
        this.getFieldList = function(key) {
            _fieldListObject[key] = (_fieldListObject[key]) ? _fieldListObject[key] : new GetFieldList(key);
            return _fieldListObject[key];
        }

        // Todo: The fact that this takes a service as a parameter indicates that the code needs
        // to be refactored.
        // this.getPlatformAPIObject = function(platform, concept) {
        //     if(!platform) return;
        //     var platformData = {platform: {id:platform.id} };
        //     var fieldList = this.getFieldList(platform.name);

        //     for (var field in fieldList) {
        //         var fieldName = fieldList[field];
                
        //         if( concept.field(fieldName) && concept.field(fieldName).value()) {
        //             platformData[field] = this.formatValue(field, concept.field(fieldName).value() );
        //         }
        //     }

        //     return platformData;
        // };


        //This function format data based on API requested
        // this.formatValue = function(key, value) {
        //     var returns = [], config;

        //     switch(key) {
        //         case 'exclusiveAtLaunch':
        //         case 'offlineMultiplayer':
        //         case 'onlineMultiplayer':
        //             return AppConfig.isBoolean( value );

        //         case 'businessModel':
        //             return (value) ? value : '';

        //         case 'plannedPeripherals':
        //             var item;
        //             value.forEach(function(data) {
        //                 item = {};
        //                 item.required = AppConfig.isBoolean( data.field.model() );
        //                 item.peripheral = {"id": data.value };
        //                 returns.push( item );
        //             });
        //             return returns;

        //         case 'plannedDistributionMedia':
        //             value.forEach(function(data) {
        //                 var item = { "id": data}; //format
        //                 returns.push( item );
        //             });
        //             return returns;
                
        //         case 'plannedLanguages':
        //             return value.map(function (code) {return {isocode: code}});
                
        //         case 'plannedFeatures':
        //             value.forEach(function(data) {
        //                 var item = { "feature": { "id": data } };
        //                 returns.push( item );
        //             });

        //             return returns;

        //         case 'plannedRegions':
        //             value.forEach(function(data) {
        //                 returns.push(returns);
        //                 if(data.releaseDate.date) {
        //                     data.releaseDate.date = $filter('date')(data.releaseDate.date, 'yyyy-MM-ddTHH:mm:ss') + 'Z';
        //                 }
        //             });
        //             return value;
        //             break;

        //         default:
        //             return value;
        //     }
        // }
        //End of formatValue


    }
);
