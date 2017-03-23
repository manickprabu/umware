angular.module('conceptProposal').directive('interactiveMap',
    function(conceptWidgetServiceCore, conceptCommonServiceField) {
        return {
            restrict: 'A',
            controllerAs: 'interactiveMapController',
            templateUrl: 'app/components/concept-proposal/partial/interactive-map.html',
            controller: function controller($scope, $timeout) {

                $scope.selectRegions = [];
                $scope.regionCheckboxes = conceptWidgetServiceCore.regions.list();


                this.regionSelected = function(element) {

                    // Region selected from hover or click
                    // Click uses element id and hover uses currentTarget selector
                    var regionId = (element.id ? element.id : element.currentTarget.id).toUpperCase();

                    $scope.selectRegions = $scope.regionCheckboxes;

                    // // Change state of selected region
                    angular.forEach($scope.selectRegions, function(item) {
                        if (item.label === regionId) {

                            toggleState(item, element);

                            if (item.state) {
                                $scope.checked.push(item);
                                // Highlight map region if region on map is selected
                                angular.element(element).addClass('active');
                                // Highlight map region if checbox is selected
                                $scope.regionHover(item);
                            }
                            if (!item.state) {
                                // Remove active state from region
                                angular.element(element).removeClass('active');
                                $scope.regionUnhover(item);
                                $scope.checked.forEach(function(region, index) {
                                    if (region.label === item.label) {
                                        // Remove uncheckd region
                                        $scope.checked.splice(index, 1);
                                    };
                                });
                            };
                        };
                    });

                    // Update field value with selected regions
                    conceptCommonServiceField.field('proposal.regions').value($scope.checked.map(function map(region) {
                        return region;
                    }));
                };

                // Toggle the state of the scope object and ui element
                function toggleState(item, element) {
                    if (typeof element.checked !== 'undefined') {
                        item.state = element.checked;
                    } else {
                        item.state = !element.currentTarget.classList.contains("active");
                    }
                };

                $scope.regionHover = function(item) {
                    var el = document.querySelector("#" + item.label.toLowerCase());
                    angular.element(el).addClass('hover');
                    if (item.state) {
                        // Add selected class to map - highlight
                        angular.element(el).addClass('active');
                    }
                    // If item is checked/selected show popover
                    angular.element(el).triggerHandler('mouseenter');
                };

                // Chcek region fields for draft values - Populate checked with draft values or create empty array
                if (conceptCommonServiceField.field("proposal.regions").value()) {
                    $scope.checked = conceptCommonServiceField.field("proposal.regions").value().map(function(region) {
                        region.state = true;
                        region.label = region.name;
                        $scope.regionHover(region);
                        return region;
                    });
                } else {
                    $scope.checked = [];
                };


                $scope.regionUnhover = function(item) {
                    var el = document.querySelector("#" + item.label.toLowerCase());
                    angular.element(el).removeClass('hover');
                    if (!item.state) {
                        angular.element(el).removeClass('active');
                    }
                    // Hide popover
                    angular.element(el).triggerHandler('mouseleave');
                };

                $scope.regionSelected = this.regionSelected;

                $timeout(function() {
                    // Binding click handler to region checkboxes - shared directive
                    angular.element(document.querySelectorAll('div[data-concept-proposal-row-field="proposal.regions"] input'))
                        .on('click', function(e) {
                            // One time binding of id to element
                            var element = e.currentTarget;
                            if (!element.id) {
                                var scope = angular.element(element).scope();
                                element.id = scope.item.label;
                            };
                            $scope.regionSelected(element);
                        });

                    // Binding hover to checkbox labels
                    angular.element(document.querySelectorAll('div[data-concept-proposal-row-field="proposal.regions"] .checkbox-inline'))
                        .on('mouseenter', function(e) {
                            // One time binding of id to element
                            var scope = angular.element(e.currentTarget).scope(),
                                element = e.currentTarget;

                            if (!element.id) {
                                // Set element id to item label - region name
                                // Set item state to checkbox checked status - boolean
                                element.id = scope.item.label;
                                scope.item.state = element.control.checked;
                            };
                            // Hovering checkbox must highlight region of map
                            $scope.regionHover(scope.item);
                        })
                        .on('mouseleave', function(e) {
                            var scope = angular.element(e.currentTarget).scope();
                            $scope.regionUnhover(scope.item);
                        });
                });
            },
            link: function(scope, element, attr) {
                var x,
                    y;

                // Find the element which will contain popover
                document.querySelectorAll('.map-block[data-title][uib-popover]').forEach(function(el) {
                    angular.element(el).on('mousemove', function(e) {
                        // find the X & Y coordinates of the mouseove
                        x = e.pageX;
                        y = e.pageY;

                        var $popover = $('.popover');

                        // Set popover position
                        $popover.css({
                            'top': (y + 20),
                            'left': x - ($popover.innerWidth() / 2)
                        });

                    });

                });
            }
        };
    });
