/*
    idea for this config file to keep all application level configuration/constans
*/
angular.module('application').factory('AppConfig',
function AppConfig($filter) {
    
    var options = {};

    /*
        this constant used across applicaion to maintain consistancy for "concept status"
    */
    var constant = {
        CONCEPT_STATUS:{
            ACTIVE          : 'ACTIVE',
            SUSPENDED       : 'SUSPENDED',
            WITHDRAWN       : 'WITHDRAWN',
            ON_HOLD         : 'ON_HOLD',
            WITHDRAWN       : 'WITHDRAWN',
            DRAFT           : 'DRAFT',
            COMPLETED       : 'COMPLETED',
            PUBLISHED       : 'PUBLISHED',
            IN_DEVELOPMENT  : 'IN_DEVELOPMENT',

            //search key
            ALL             : 'ALL',
            NEW             : 'NEW',
            INACTIVE        : 'INACTIVE',
            UNASSIGNED      : 'UNASSIGNED',
            ASSIGNED_TO_ME  : 'ASSIGNED_TO_ME'
        }
    };

    // this is extra custom helper methods which help common behaviour across application
    var methods = {
        isBoolean : function(value) {
            return (value && (value === 'true' || value === 'yes')) ? true : false;
        },

        notBoolean: function(value) {
            return (value ) ? 'yes' : 'no';
        },

        //formate date to API
        formatDate: function(date) {
            return $filter('date')(date, 'yyyy-MM-ddTHH:mm:ss') + 'Z';
        },
        // format date to short date
        formatToShortDate : function(date) {
            return $filter('date')(date, 'yyyy-MM-dd');        
        }

    }

    angular.extend(options, constant, methods);

    return options;
});
