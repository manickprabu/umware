conceptProposal.controller('plannedPeripheralsController',
    function(
        $scope,
        conceptOverviewModel,
        conceptCommonServiceField,
        conceptWidgetServicePlannedPeripherals
    ) {

        conceptWidgetServicePlannedPeripherals.init($scope.platformName);
        this.fields = conceptOverviewModel.fields($scope.platformName);
        this.selectAll = true;

        //update when user selected peripherals
        this.updateFieldValue = function () {
            conceptWidgetServicePlannedPeripherals.updateFieldValue();
        }

        //get peripherals instance 
        this.selectedPeripherals = conceptWidgetServicePlannedPeripherals.selectedPeripherals;

        //toggle selected all
        this.toggleSelectAll = function() {
            this.selectAll = !this.selectAll;
            this.selectedPeripherals.forEach(angular.bind(this,function(peripheral) {
                peripheral.selected = this.selectAll;

            }));
            //call update method
            this.updateFieldValue();
        };
       
    }
);
