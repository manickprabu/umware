
// Message Bundle directive
// this directive bind value for key from message bundle api
angular.module('messageBundle')
    .controller('messageBundleController', function(){
        // if( !this.messageBundle ) {
        //     throw new Error( "messageBundle directive 'KEY' messageBundle API must be passed");
        // }
    })
    .directive('messageBundle', function messageBundle(messageBundleServiceCore){
        return {
            restrict:'A',
            scope: {
                messageKey : '@messageBundle',
            },
            template: '<span></span>',
            // bindToController: true, //don't 
            controllerAs: 'messageBundleController',
            controller: 'messageBundleController',
            link:function($scope, $element, $attr) {
                //add always begining of the element
                $element.children(":first").append( messageBundleServiceCore.message('concept', $scope.messageKey) );
            }

        };
    }
);

