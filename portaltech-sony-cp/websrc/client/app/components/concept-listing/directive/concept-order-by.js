
angular.module('conceptListing').directive('conceptOrderBy',
    function(orderByFilter, $timeout) {
        return {
            link: function($scope, $element, $attr) {
                var propertyName = $attr.conceptOrderBy;
                var className = propertyName.split('.').join('');
                var reverse = false;

                //add up/down arrow element at end of the element
                var arrow = angular.element('<span>&nbsp;<span aria-hidden="true" class="fa orderBy'+className+'"></span></span>');
                $element.children(":last").append(arrow);

                //add button role
                $element.attr("role", 'button');
                addArrowKey();

                $element.on('click', function() {
                    $timeout(function() {
                        reverse = (propertyName !== null) ? !reverse : false;
                        $scope.orderBy(propertyName, reverse);

                        addArrowKey();
                    });
                });

                function addArrowKey() {
                    if(propertyName !== null) {
                        $( ".orderBy"+className ).toggleClass( 'fa-chevron-up', reverse );
                        $( ".orderBy"+className ).toggleClass( 'fa-chevron-down', !reverse );
                    }
                }
                
            }
        }
    }
);