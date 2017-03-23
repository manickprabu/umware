angular.module('notification').directive('notificationLocal',NotificationLocal);

function NotificationLocal(notificationServiceCore, sharedDropdownFactoryCore, notificationServiceAPI, $filter) {  
    
    return {
        templateUrl: 'app/components/notification/partial/local.html',
        controller : notificationController,
        controllerAs : "vm",
        link : linkFunction
    };
     
    /// Maint Controller  
    function notificationController() {   
        this.dropdown = sharedDropdownFactoryCore([], {
                search: false,
                placeholder: ''
        });
        /// Populate the dropdown list
        notificationServiceCore.update(angular.bind(this, function () {
            this.dropdown.list(notificationServiceCore.list.local().map(
                function dropdown(notification) {
                    return {
                        label: notification.message,
                        value: notification.id
                    };
            }));
            /// Fix the values 
            this.notifyLength = this.dropdown.list().length;            
            this.alertMessage = $filter('messageBundle')('notification.concept.clearall');
            this.notificationText = $filter('messageBundle')('notification.concept.notification.name');
        }));            
    };

    /// Link function
    function linkFunction(scope, element, attrs, ctrl) {
        /// Button click to clear all
        scope.removeAll = function() {
            notificationServiceAPI.mark()
            .success(function(data) {                   
                ctrl.notifyLength = 0;
            })
            .error(function(data, status) {
                
            }); 
        } 
    };
};
