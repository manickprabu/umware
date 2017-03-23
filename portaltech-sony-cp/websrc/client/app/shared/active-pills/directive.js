angular.module('sharedActivePills').directive('sharedActivePills', function(){
return {
    	restric: 'A',
    	templateUrl : 'app/shared/active-pills/index.html',
    	scope : {
    		list : '=',
            field : '@'
    	},
    	controllerAs:"conceptProposalControllerActivePills",
    	controller : function ($scope, conceptCommonServiceConfig) {

            // model set to selected items passed in from directive
            var activePills = [];;

            // If list is empty display empty pills
            // Applicable for concepts in draft status 

             // Config
            var platforms = conceptCommonServiceConfig.config('platforms');
            var regions = conceptCommonServiceConfig.config('regions');

            $scope.$watch('list', angular.bind(this, function(data) {

                if(data) {

                    activePills = $scope.list || [];

                    // Map correct fields based on field parameter
                    if($scope.field == "regions"){
                        this.pills = mapFields(regions);
                    }
                    if($scope.field == "platforms"){
                        this.pills = mapFields(platforms);                
                    }

                    // Set active to be true for each item if present in active Pills
                    // Evaluates using type key may need to comapre label key depending upon api repsonse
                    activePills.forEach(angular.bind(this, function(activePill) {
                        this.pills.map(function(pill) {
                            if(pill.name === activePill.type) {
                                pill.active = true;
                            }
                        })
                    }));
                }                
            }));

            function mapFields(arr) {
                var map = arr.map(function(item, index) {
                    return {
                        "name": item.name || item.code,
                        "active": false
                    }
                })
                return map;
            }
            

    	}
    }

});
