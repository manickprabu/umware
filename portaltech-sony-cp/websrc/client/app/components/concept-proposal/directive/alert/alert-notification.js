(function() {
    angular.module('conceptProposal').directive('alertNotification', alertNotification);
    
    function alertNotification($location, $stateParams, globalFieldsService, $timeout) {   
            
            return {
                restrict : 'EA',
                templateUrl: 'app/components/concept-proposal/directive/alert/alert-notification.html',                 
                link : linkAlertNotification            
            };        

            /// Main Link function

            function linkAlertNotification(scope, element, attrs) {              

                /// This is our ng-hide flag
                scope.showHide = true;
                var conceptId = $stateParams.conceptId;
                var overviewUrl = "/concept/overview/" + conceptId;
                /// Double protection to stop alert showing on each page
                if(makeLowerCase($location.$$path) === makeLowerCase(overviewUrl)) {   
                    if(globalFieldsService.conceptCreated) {
                        globalFieldsService.setValue(false);
                        scope.showHide = false;  // ng-hide: means true to show this
                    }; 
                };                 
                /*
                 *  When Alert fades away, it leaves the concept anchor un-clickable due to its presenece in the DOM.
                 *  So used this below CSS hack to add Z-index to fix it  
                 */
                $timeout(function() {                    
                    angular.element(element[0].querySelector('.alert-dismissible')).addClass('disappear');
                }, 3000);                 
            }; 

            function makeLowerCase(string){
                return angular.lowercase(string);
            };
    };

}())