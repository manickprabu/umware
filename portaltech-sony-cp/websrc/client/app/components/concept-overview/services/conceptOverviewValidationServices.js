angular.module('conceptOverview').service('conceptOverviewValidationServices',
function conceptOverviewValidationServices(
   User, AppConfig, conceptCommonServiceManager
) {

    // Record function to output object on digest cycle.
    this.concept = conceptCommonServiceManager.concept();
   
    /// If user is logged in as Partners Only
    /// And concept status is WITHDRAWN
    /// Then donot show the edit button at all
    /// I could write in the html but to give the overview / background of the problem, 
    /// i wrote this check in this controller

    this.partnersWithdrawnCheck =  function() {        
        if(User.isPartner() && (this.concept.status === AppConfig.CONCEPT_STATUS.WITHDRAWN)) {                          
            return false;
        }        
        return true;
    };       
});
