//Directive for previous and next
angular.module('conceptProposal').directive('selectQuarter',
    function(messageBundleServiceCore) {
        return {
            restrict: 'E',
            templateUrl: 'app/components/concept-proposal/partial/directive/select-quarter.html',
            controllerAs: 'conceptProposalSelectQuarter',
            scope: {
                setReleaseDate: '&',
                region: '@',
                platform: '@'
            },
            controller: function($scope, $filter) {

                var vm = this;  //// VM is the instansce of controllar
                vm.inlineOptions = {
                    // minDate: new Date()
                };

                /// --- Initialize values of the variables
                vm.NewDate = new Date(Date.now());
                vm.dt = new Date(Date.now());
                vm.format = 'dd-MMMM-yyyy';
                vm.years = getYears(0,5);
                // Set default year
                vm.defaultYear = vm.years[0];
                vm.months = monthsList();
                vm.defaultMonthIndex = getMonth();
                vm.defaultMonth =  monthsList()[vm.defaultMonthIndex];
                vm.year = vm.years[0];
                vm.quarters = [];
                vm.releaseDate = '';
                vm.PreviousDisable = false;
                vm.NextDisable = false;

                /// Default options of the calander control
                vm.dateOptions = {
                    formatYear: 'yy',
                    minDate: vm.NewDate,
                    maxDate: new Date(2020, 5, 22),
                    startingDay: 1,
                    showWeeks: false
                };

                vm.openDatePopup = function() {
                    vm.datePopup.opened = true;
                };

                vm.datePopup = {
                    opened: false
                };

                //// Quarter Tab Contents
                vm.setDate = function(year, month, day) {
                    vm.dt = new Date(year, month, day);
                };

                vm.setSingleQuarter = function(quarter) {
                    vm.DefaultQuarter =  quarter;
                };

                vm.setYear = function(year) {
                    vm.defaultYear = year;
                    findQuarterBasedOnCurrentDate(year);
                };

                /// Calander Tab contents

                vm.setDateByMonth = function(month) {
                    vm.defaultMonth = monthsList()[month];
                    vm.defaultMonthIndex  = month;
                    vm.NewDate = new Date(vm.defaultYear, vm.defaultMonthIndex, '01');
                    vm.dt = vm.NewDate;
                    enableDisableNextPrevious();
                }

                vm.setDateByYear = function(year) {
                    vm.defaultYear = year;
                    vm.defaultMonthIndex ++;
                    vm.NewDate = new Date(year, vm.defaultMonthIndex, '01');
                    vm.dt = vm.NewDate;
                    vm.NextDisable = false;
                    vm.PreviousDisable = false;
                    enableDisableNextPrevious();
                };

                vm.exactDateTabTitle = messageBundleServiceCore.message('concept', 'proposal.plannedPlatforms.availability.exactDate');

                vm.quarterTabTitle = messageBundleServiceCore.message('concept', 'proposal.plannedPlatforms.availability.quarter');

                /// Fetch Quarters
                findQuarterBasedOnCurrentDate();                 

                if(vm.quarters) {
                    if(vm.quarters.length>0) {
                        /// Set default Quarter value
                        vm.DefaultQuarter = vm.quarters[0].value;
                    }
                };                 

                vm.setQuarter = function() {
                    //call parent method with this value
                    $scope.setReleaseDate({
                        releaseDate: vm.DefaultQuarter + '-' + vm.defaultYear
                    });
                };

                vm.setDate = function() {
                    //call parent method with this value
                    $scope.setReleaseDate({
                        releaseDate: $filter('date')(vm.dt, 'yyyy-MM-dd')
                    });
                };

                // Todo  - Need to discuss whether we need to find whether these keys are ok to use or need to put in cofig??
                function monthsList() {
                    var months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                    return months;
                }

                vm.prev = function () {
                    vm.PreviousDisable = false;
                    refreshDate(-1);
                    enableDisableNextPrevious();
                };

                vm.next = function () {
                    vm.NextDisable = false;
                    refreshDate(1);
                    enableDisableNextPrevious();
                };

                // Get list of years from today date to next 5 or 10 years
                function getYears(offset, range) {
                    var currentYear = new Date().getFullYear();
                    var years = [];
                    for (var i = 0; i < range + 1; i++){
                        years.push(currentYear + offset + i);
                    }
                    return years;
                }

                /// Get default month of today date
                function getMonth() {
                    var buf = new Date();
                    var bufDate = buf.getDate();
                    var bufMonth = buf.getMonth();
                    return bufMonth;
                }

                /// Enable / Disable next and previous buttons when it reaches to end
                function enableDisableNextPrevious() {

                    if(vm.defaultMonthIndex === 11) {
                        vm.NextDisable = true;
                        vm.PreviousDisable = false;
                    } else if(vm.defaultMonthIndex === 0) {
                        vm.PreviousDisable = true;
                        vm.NextDisable = false;
                    }
                    else {
                        vm.PreviousDisable = false;
                        vm.NextDisable = false;
                    }
                };

                // Private function for next and previous navigation

                function refreshDate(cnt) {
                    var todayDate = new Date(Date.now());
                    var todayMonth = todayDate.getMonth();
                    var todayYear = todayDate.getFullYear();
                    //// --- Get info from the current set date
                    var buf = new Date(vm.dt);
                    var bufDate = buf.getDate();
                    var bufMonth = buf.getMonth();
                    vm.defaultYear = buf.getFullYear();
                    var changeDate;
                    bufMonth = bufMonth + cnt;
                    vm.defaultMonthIndex = bufMonth;
                    vm.defaultMonth = monthsList()[bufMonth];
                    changeDate = new Date(vm.defaultYear, bufMonth, '01');
                    vm.dt = changeDate;

                    if((todayMonth === bufMonth) && (todayYear === vm.defaultYear)) {
                        vm.defaultMonthIndex = todayMonth;
                        vm.defaultMonth = monthsList()[todayMonth];
                        vm.dt = todayDate;
                    }
                }

                function findQuarterBasedOnCurrentDate(currentYear) { 
                    vm.quarters = [];                  
                    var month = new Date().getMonth();
                    var year = new Date().getFullYear();                    
                    if(!currentYear) {
                        currentYear = year;
                    }; 
                    // Here quarterTotel starts with 1, as to start the first quarter by default
                    var quarterTotel = 1;
                    /// check if month is there and year if passed is current year
                    /// This check is for only current year 
                    if((month> 0) && (currentYear === year)) {
                        /// Iterate for 4 quarters
                        for (var i = 1; i <= 4; i++) {                       
                           
                            if(month>8) {           //// Quarter 4       
                                quarterTotel = 4;
                            } else if(month>5) {    //// Quarter 3
                                quarterTotel = 3;
                            } else if(month>2) {    //// Quarter 2
                                quarterTotel = 2;
                            } else if( month>= 0) { /// Quarter 1 
                                quarterTotel = 1;
                            }                            
                        }
                    };                    
                    /// End of current check

                    for (var ii = quarterTotel; ii <= 4; ii++) {                        
                        vm.quarters.push({
                            name: messageBundleServiceCore.message('concept', 'proposal.plannedPlatforms.availability.quarter') + ' ' + ii,
                            value: 'Q' + ii
                        });                          
                    };                    
                };
            }
        };
    });
