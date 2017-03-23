/*
    PLAY-STATION service is helper service for platform module 
    which return matrix format 'competitor platform' data and update its own field.value() 
    when user change
*/
// Service for concept proposal
angular.module('conceptWidget').service('conceptWidgetPlayStation',
    function conceptProposalPlayStationModel(
        conceptCommonServiceConfig,
        conceptCommonServiceField,
        $filter
    ) {

        var matrixData, competitorRegions, plannedCompetitorPlatforms, availableCompetitorPlatforms = [];
        var field = conceptCommonServiceField.field('proposal.plannedCompetitorPlatforms');

        //return competitorPlatforms into matrix format to print in angular.ng-repeat
        //i.e: [[1,2,3], [4,5,6], [7,8,9]];
        function getMatrixData() {
            availableCompetitorPlatforms = conceptCommonServiceConfig.config('competitorPlatforms');
            plannedCompetitorPlatforms   = field.value() || availableCompetitorPlatforms;
            competitorRegions            = conceptCommonServiceConfig.config('competitorRegions');

            matrixData = [];
            angular.forEach(availableCompetitorPlatforms, angular.bind(this, function(competitor) {
                var competitorId = competitor.id;

                //filter plannedCompetitor from available one
                var plannedCompetitor = plannedCompetitorPlatforms.filter(function(item) {
                    return (item.competitorPlatform && item.competitorPlatform.id == competitorId);
                });

                //check if plannedCompetitor is still available one
                plannedCompetitor = (plannedCompetitor.length) ? plannedCompetitor[0].plannedCompetitorRegions : [];
                plannedCompetitor = plannedCompetitor || [];

                //create empty regions
                competitor.regions = [];

                //loop through competitorRegions to creation new region object
                angular.forEach(competitorRegions, angular.bind(this, function(region) { 
                    //make a copy of region
                    var region = angular.copy(region);
                    var releaseDate = plannedCompetitor.filter(function(item) {
                        return (item.competitorRegion && item.competitorRegion.id == region.id);
                    });

                    //if releaseDate found then
                    region.releaseDate = {date:null}; //default value  'QX-YYYY'
                    if(releaseDate.length) {
                        region.releaseDate = releaseDate[0].releaseDate;

                         // pre-select competitor row
                        competitor.selected = true;
                    }

                    //to print on UI
                    region.value = formatReleaseDate(region.releaseDate);
                    region.isPopupOpen = false;

                    //assin it one
                    competitor.regions.push(region);
                }));

                matrixData.push(competitor);
            }));

            return matrixData;
        }


        //update final competitor object into field.value() which save/submit api consume
        function updateToField(availableCompetitorPlatform) {
            var returns = [];         

            availableCompetitorPlatform.forEach(angular.bind(this, function(platform) {
                if(platform.selected) {
                    var competitorPlatform = {competitorPlatform:{id:0}}, plannedCompetitorRegions = [];
                    competitorPlatform.competitorPlatform.id = platform.id;

                    platform.regions.forEach(function(region) {
                        if(region.value) {
                            var dates = region.value.split('-');
                            var competitor = {id:region.id, releaseDate:{}, competitorRegion:{}};

                            //update releaseDate;
                            if(dates.length == 2) {
                                competitor.releaseDate.quarterTime = {};
                                if(dates[1] !== 'YYYY') {
                                    competitor.releaseDate.quarterTime.quarter = dates[0];
                                    competitor.releaseDate.quarterTime.year = dates[1];
                                }
                            } else if(dates.length == 3) {
                                competitor.releaseDate.date = formatDate(region.value);
                            }

                            //update competitorRegion;
                            competitor.competitorRegion = {id:region.id, name:region.name};
                            
                            plannedCompetitorRegions.push( competitor );
                        }
                    });

                    competitorPlatform.plannedCompetitorRegions = plannedCompetitorRegions;
                    returns.push(competitorPlatform);
                }
            }));

            field.value(returns);

            return returns;
        }


        //helper method to format release date for UI 
        function formatReleaseDate(releaseDate) {
            if(releaseDate.date) {
                return $filter('date')(releaseDate.date, 'yyyy-MM-dd');
            } else if(releaseDate.quarterTime) {
                return releaseDate.quarterTime.quarter + '-' + releaseDate.quarterTime.year;
            } else {
                return null;
            }
        }

        //format releaseDate for API
        function formatDate(value) {
            return $filter('date')(value, 'yyyy-MM-ddTHH:mm:ss') + 'Z'; 
        }

        return {
            getMatrixData: getMatrixData,
            updateToField: updateToField,
            formatDate: formatDate,
        }

    }
);
