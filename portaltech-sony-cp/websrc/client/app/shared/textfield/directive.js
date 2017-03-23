angular.module('sharedTextfield', [])
    .directive('hitEnterEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13 || event.keyCode === 13) {
                    scope.$eval(attrs.hitEnterEvent)
                    event.preventDefault();
                }
            });
        }
    };
});
