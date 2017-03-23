angular.module('notification').directive('notificationGlobal', notificationGlobal);


function notificationGlobal(notificationServiceCore, $timeout, notificationServiceAPI,$window, $timeout) {

        return {
            templateUrl: 'app/components/notification/partial/global.html',
            controller : notificationGlobalController,
            controllerAs: 'vm',
            link : linkFunctionGlobal
        };

        /// Main controller
        function notificationGlobalController() {
                var colours = {
                    'INFO': 'lightblue',
                    'WARNING': 'orange'
                };
                notificationServiceCore.start();
                var processedArray = [];

                this.quantity = 1;
                this.messages = function () {

                    var messages = notificationServiceCore.list.global()
                    .map(function global(notification) {
                        var backgroundColour = colours[notification.level];
                        notification.style = { 'background-color': backgroundColour };

                        if (processedArray.indexOf(notification.id) == -1) {
                            processedArray.push(notification.id);
                        }
                        return notification;
                    });
                    this.notifyLength = messages.length;
                    return messages.reverse();
                };
        };

        /// Main Link function
        function linkFunctionGlobal(scope, element, attrs, ctrl) {
            /// Fade the notification and delete it
            $timeout(function() {
                    angular.forEach(ctrl.messages(), function(value, key) {
                        value.hide = true;
                        deleteNotifications(value.id, ctrl);
                    });
            }, 10000);
            /// Close the notification with mark it read button
            scope.closeWindow = function(notify) {
                notify.hide=true;
                deleteNotifications(notify.id, ctrl);
            };
        };

        // API Call to delete this notifications
        function deleteNotifications(id, ctrl) {
             notificationServiceAPI.mark(id)
                .success(function(data) {
                    ctrl.notifyLength = ctrl.notifyLength - 1;
                })
                .error(function(data, status) {});
        };
};
