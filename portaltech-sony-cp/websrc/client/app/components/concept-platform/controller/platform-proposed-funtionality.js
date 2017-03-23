
conceptProposal.controller('platformProposedFunctionalityEditController',
    function(
        conceptWidgetServiceCore,
        conceptOverviewModel,
        conceptCommonServiceField,
        $scope,
        conceptWidgetServicePlannedFeatures        
    ) {         
        var fields = this.fields = conceptOverviewModel.fields($scope.platformName);

        //filters to fetch data by selected platformName    
        this.plaformFeaturesFilter = conceptWidgetServiceCore.plannedFeatures.filter(function(item) {       
            return (item.feature.platform.name == conceptOverviewModel.platformName);
        }); 
        
        this.plannedFeatures  = conceptWidgetServicePlannedFeatures.plannedFeatures(this.plaformFeaturesFilter);
    }
);