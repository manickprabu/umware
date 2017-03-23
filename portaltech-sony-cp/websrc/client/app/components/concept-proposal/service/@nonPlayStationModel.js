

// Service for concept proposal
angular.module('conceptProposal').service('conceptProposalPlayStationModelDELETED',
    function conceptProposalPlayStationModel(conceptCommonServiceConfig, conceptDataCache) {

        var concept = conceptDataCache.getConcept();
        var competitorMatrixArray, competitorPlatforms, competitorRegions, plannedCompetitorPlatforms;

        //helper method to format release date
        function _formatReleaseDate(releaseDate) {
            if(releaseDate.date) {
                return releaseDate.date;
            } else if(releaseDate.quarterTime) {
                return releaseDate.quarterTime.quarter + '-' + releaseDate.quarterTime.year;
            } else {
                return '-';
            }
        }

        function getData(reset) {
            competitorMatrixArray = (!competitorMatrixArray || reset) ? matrixData() : competitorMatrixArray;

            return competitorMatrixArray;
        }

        //convert competitorPlatforms into matrix format to print in angular.ng-repeat
        //i.e: [[1,2,3], [4,5,6], [7,8,9]];
        function matrixData() {
            //TO DO - THIS IS FIXED IN 'EDIT' BRANCH
            try{
            concept = conceptDataCache.getConcept();
            plannedCompetitorPlatforms = (concept) ? concept.proposal.plannedCompetitorPlatforms : conceptCommonServiceConfig.config('competitorPlatforms');
            competitorPlatforms = conceptCommonServiceConfig.config('competitorPlatforms');
            competitorRegions = conceptCommonServiceConfig.config('competitorRegions');
            var matrixArray = [];

            angular.forEach(competitorPlatforms, angular.bind(this, function(competitor) {
                var competitorId = competitor.id;
                var plannedCompetitor = plannedCompetitorPlatforms.filter(function(item) {
                    return (item.competitorPlatform && item.competitorPlatform.id == competitorId);
                });
                plannedCompetitor = (plannedCompetitor.length) ? plannedCompetitor[0].plannedCompetitorRegions : [];
                competitor.regions = [];

                //TO DO - api does not return date object, so this line will remove later
                plannedCompetitor = (plannedCompetitor) ? plannedCompetitor : [];

                angular.forEach(competitorRegions, angular.bind(this, function(region) {
                    //make a copy of region
                    var region = angular.copy(region);
                    var releaseDate = plannedCompetitor.filter(function(item) {
                        return (item.competitorRegion && item.competitorRegion.id == region.id);
                    });

                    region.releaseDate = (releaseDate.length) ? releaseDate[0].releaseDate : {date:'QX-YYYY'};

                    //to print on UI
                    region.value = _formatReleaseDate(region.releaseDate);
                    region.isPopupOpen = false;

                    competitor.regions.push(region);
                }));

                matrixArray.push(competitor);
            }));

            } catch(error) {
                console.log('error ')
            }

            return matrixArray;
        }


        //Template for return api object
        var competitorPlatform = {
            
        };

        //render final api object based on field.value();
        function render() {
            var returns = [], data = conceptProposalServiceConcept.field('proposal.plannedCompetitorPlatforms').value() || [];

            data.forEach(angular.bind(this, function(platform) {
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
                                competitor.releaseDate.quarterTime.quarter = dates[0];
                                competitor.releaseDate.quarterTime.year = dates[1];
                            } else if(dates.length == 3) {
                                competitor.releaseDate.date = region.value;
                            }

                            //update competitorRegion;
                            competitor.competitorRegion.name = region.name;

                            plannedCompetitorRegions.push( competitor );
                        }
                    });

                    competitorPlatform.plannedCompetitorRegions = plannedCompetitorRegions;
                    returns.push(competitorPlatform);
                }
            }));

            return returns;
        }

        return {
            getData:getData,
            render:render
        }

    }
);
