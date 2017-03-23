/*
	This is the service to keep the global variables values from submit button to overview page
*/
(function() {
	angular.module('conceptProposal').factory('globalFieldsService', function() {
	    var globalFields = {};
	    globalFields.conceptCreated = false;
	    globalFields.flagTriggered  = false ;
	    globalFields.setValue = function (value) {
	       globalFields.conceptCreated = value;
	    };

	    globalFields.setFlag = function (value) {
	       globalFields.flagTriggered = value;
	    };
	    return globalFields;
	});
}())