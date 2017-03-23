
conceptProposal.controller('platformLanguageDistributionController', 
     function(
        $scope, 
        conceptWidgetServiceCore, 
        conceptCommonServiceField, 
        conceptWidgetServiceLanguageDistribution,
        sharedDropdownFactoryCore, 
        conceptCommonServiceManager, 
        conceptOverviewModel
    ){

        conceptWidgetServiceLanguageDistribution.init($scope.platformName);
        this.concept = conceptCommonServiceManager.concept();
        this.config = conceptWidgetServiceCore;
        this.fields = conceptOverviewModel.fields($scope.platformName);

        //create dynamic Yes/No field 
        this.config[this.fields.offlineMultiplayer] = conceptWidgetServiceCore.createYesNoField(this.fields.offlineMultiplayer);
        this.config[this.fields.onlineMultiplayer] = conceptWidgetServiceCore.createYesNoField(this.fields.onlineMultiplayer);

        //get reference 
        this.plannedDistributionMedia = conceptWidgetServiceLanguageDistribution.getPlannedDistributionMedia(this.fields.plannedDistributionMedia);
        this.plannedLanguages = conceptWidgetServiceLanguageDistribution.getPlannedLanguages(this.fields.plannedLanguages);

        //business model
        this.businessModel = sharedDropdownFactoryCore(conceptWidgetServiceCore.businessModel, {
                value: conceptCommonServiceField.field(this.fields.businessModel).value 
            });
    }
);

