
// Service to list which fields appear on which pages on the concept views for:
// - Proposal
// - Platforms
angular.module('conceptProposal').factory('conceptCommonServicePageFields',
function conceptCommonServicePageFields(conceptCommonServiceField, messageBundleServiceCore) {
    
    //fields list which are based on imformation(0), platform(1) & compliance(2) proposal pages.
    var pageFieldList = [
        [
            'franchise',
            'proposal.regions',
            'leadRoles',
            'conceptType',
            'nameEN',
            'nameJA',
            'superGenre',
            'categoryGenre',
            'proposal.targetAge'
        ],
        //this platform fields array will dinamically handled when user select/deselect new platforms 
        //i.e: ps4, ps3 or psvita
        [
            'proposal.plannedPlatforms',
        ],
        [
            'compliance.occCompliance',
            'compliance.occComplianceComment',
            'compliance.virtualCurrencyCompliance',
            'compliance.virtualCurrencyComplianceComment',
            'compliance.legalDisclaimerAccepted',
            'concept.overview.internalReview'
        ]           
    ];

    //platform fields list
    //we hard-coded just because we don't have list of available fields for each platform-accordion.
    function FieldList(platformName) {
        var fields =  {   
                'exclusiveAtLaunch'     : 'proposal.plannedPlatforms[#PLATFORM#].exclusiveAtLaunch',
                'plannedRegions'        : 'proposal.plannedPlatforms[#PLATFORM#].plannedRegions',
                'plannedLanguages'      : 'proposal.plannedPlatforms[#PLATFORM#].plannedLanguages',
                'businessModel'         : 'proposal.plannedPlatforms[#PLATFORM#].businessModel',
                'offlineMultiplayer'    : 'proposal.plannedPlatforms[#PLATFORM#].offlineMultiplayer',
                'onlineMultiplayer'     : 'proposal.plannedPlatforms[#PLATFORM#].onlineMultiplayer',
                'dlcIntension'          : 'proposal.plannedPlatforms[#PLATFORM#].dlcIntension',
                'plannedPeripherals'    : 'proposal.plannedPlatforms[#PLATFORM#].plannedPeripherals',
                'plannedFeatures'       : 'proposal.plannedPlatforms[#PLATFORM#].plannedFeatures',
                'plannedDistributionMedia': 'proposal.plannedPlatforms[#PLATFORM#].plannedDistributionMedia'
        };
        angular.extend(this, fields);

        //replace #PLATFORM# with platform name 
        //i.e: PS4, PS4
        for (var field in this) {
            this[field] = this[field].replace('#PLATFORM#', platformName); 
        }
    }

    //dynamic add/remove fields on platform selection;
    function updateRequiredField() {
        var fieldObject = pageFieldList[1];
        fieldObject = ['proposal.plannedPlatforms'];

        var platformField = conceptCommonServiceField.field('proposal.plannedPlatforms');
        var platforms = platformField.value() || [];

        platforms.forEach(angular.bind(this, function(platform){
            var fieldList = this.getFieldList(platform.platform.code);

            for (var field in fieldList) {
                fieldObject.push( fieldList[field] );

                //set field active
                conceptCommonServiceField.field(fieldList[field]).active(true);
            }
        }));

        pageFieldList[1] = fieldObject;
    };


    //dinamyc add/remove required field for validation
    function validateRequireFields() {
        var page = 0;
        [
            'proposal.attachments',
            'proposal.gameDesignDocuments[EN]',
            'proposal.gameDesignDocuments[JA]'
        ].forEach(angular.bind(this, function(key) {
            var found = pageFieldList[page].indexOf(key);
            if (found > -1) {
                pageFieldList[page].splice(found, 1);
            }

            if(conceptCommonServiceField.field(key).required()) {
                pageFieldList[page].push(key);
            }
        }));

    }


    //return set of fields for selected patform based on platformName;
    //this maintain singleton instance.
    var singleFieldList = {};
    function getFieldList(platformName) {
        //if not exist then creat one set field for platformName
        if(!singleFieldList[platformName]) {
            singleFieldList[platformName] = new FieldList(platformName);
        }

        return (singleFieldList[platformName]);
    }

    //validate all required fields bases on 'pageId' and show required if 'showError' is true;
    //this function used for next-prev & submit button 
    function validatePage(pageId, showError) {
        return pageFieldList[pageId].filter(
        function fieldsForEach(fieldName) {
            var field = conceptCommonServiceField.field(fieldName);
            var valid = field.empty() && field.required();
            if(showError) {
                var message = (valid) ? messageBundleServiceCore.message('concept', field.name() + '.required') : '';
                field.getRequiredMessage( message );
            }
            return valid;
        }).length === 0;
    }

    return {
        getFieldList: getFieldList,
        validatePage : validatePage,
        updateRequiredField: updateRequiredField,
        validateRequireFields : validateRequireFields
    }
    
});
