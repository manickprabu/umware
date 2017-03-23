angular.module('conceptProposal').service('conceptlocalDataService', conceptlocalDataService);

function conceptlocalDataService(conceptLocalStorage, $timeout, $filter, conceptCommonServiceConfig, conceptWidgetServiceCore, conceptProposalPlatformDataModel, conceptCommonServiceField) {	

	 return {
       	loadInformation : loadInformation,
		loadPlatform : loadPlatform,
		loadCompliance : loadCompliance		
    };  

    /***
			Load the local storage routine for the information page
    ***/

	function loadInformation(scope) {
        console.log('******* conceptlocalDataService:loadInformation ******* Function has not been used.');
        return;

		if(conceptLocalStorage.getDraftStorage()) {
			var infoObject = conceptLocalStorage.getDraftStorage();
			$timeout(function() {

				// Set Regions
                if(infoObject.proposal.regions) {
                   var region = infoObject.proposal.regions.map(function(region) {
                        return region.code;
                   }); 

                   conceptCommonServiceField.field('proposal.regions').value(region);
                     // Assign direct correlation fields
                    [
                        'nameEN',
                        'nameJA',
                        'codeNameEn',
                        'codeNameJA',
                        'conceptType',
                        'leadRoles'
                    ].forEach(angular.bind(this, function assignFields(fieldCode) {
                        conceptCommonServiceField.field(fieldCode).value(infoObject[fieldCode]);
                        if(fieldCode == "conceptType") {
                            conceptWidgetServiceCore.type.value(infoObject[fieldCode]);
                            conceptWidgetServiceCore.type.model(infoObject[fieldCode]);
                            scope.$apply();
                        }
                        if(fieldCode == "leadRoles") {
                            conceptWidgetServiceCore.leadRoles.value(infoObject[fieldCode]);
                            conceptWidgetServiceCore.leadRoles.model(infoObject[fieldCode]);
                            scope.$apply();
                        }
                    }));

                    // Set Target Age
                    conceptCommonServiceField.field('proposal.targetAge').value(infoObject['proposal'].targetAge);

                    // Set External Feedback
                    conceptCommonServiceField.field('proposal.externalFeedbackRequired').value(infoObject['proposal'].externalFeedbackRequired)

                    // Set Super Genres
                    conceptProposalServiceConcept.genres().forEach(function forEach(superGenre) {
                        if(infoObject.superGenre) {

                            if(superGenre.id === infoObject.superGenre.id) {                  
                                conceptCommonServiceField.field('superGenre').value(superGenre.id);                   
                                conceptWidgetServiceCore.superGenre.model(superGenre.id);
                            }

                        }   
                    });
                 
                    // Set Category Genre
                    if(infoObject.categoryGenre) {
                        conceptCommonServiceField.field('categoryGenre').value(infoObject.categoryGenre.id);   
                        conceptWidgetServiceCore.categoryGenre.model(infoObject.categoryGenre.id);   
                    }                
                    
                    // Set Franchises
                    if(infoObject.franchise) {
                        conceptProposalServiceConcept.franchises().forEach(function forEach(franchise) {
                              
                            if(franchise.id == infoObject.franchise.id) {                    
                                conceptCommonServiceField.field('franchise').value(franchise.id);
                                conceptWidgetServiceCore.franchise.core.model(franchise.id);
                            }
                        });
                    }

                   // this.config.fileAttachment({'attachments': 'proposal.attachments'}).value(16007);                    

                }
			 });	
		};
	};


	/***
			Load the local storage routine for the platform page
	***/

	function loadPlatform(scope) {
        console.log('******* conceptlocalDataService:loadPlatform ******* Function has not been used.');
		return;

		if(conceptLocalStorage.getDraftStorage()) {

				var platformObject = conceptLocalStorage.getDraftStorage(); /// local storage

                $timeout(function() {

                    if(platformObject.proposal.plannedPlatforms) {

                        /// Accordion Main Route Elements
                        var platformIdArray  = platformObject.proposal.plannedPlatforms.map(function(pl) {
                            return pl.platform.id;
                        });

                        if(platformIdArray.length>0) {  ////array object
                           scope.conceptProposalControllerPlatform.availablePlatforms.map(function(response) {
                                platformIdArray.map(function(pid) {
                                    if(response.value === pid) {                                    
                                        response.selected = !response.selected; 
                                    }     
                                });                                                                   
                            });                       
                            scope.$apply();  
                        };                    

                        //// Availability on Non-PlayStation platforms ===== plannedCompetitorPlatforms
                        if(platformObject.proposal.plannedCompetitorPlatforms.length>0) {
                            var plannedCompPlatforms = platformObject.proposal.plannedCompetitorPlatforms.map(function(plancomp){
                                
                            });
                        };

                        // Rest of accordion stuff

                        var competitorPlatforms = JSON.parse(JSON.stringify(conceptCommonServiceConfig.config('platforms')));

                        var platformArray = competitorPlatforms.map(function(platform) {     /// returns {id: 0, code: "PSVita", name: "PSVita"}                       
                            return platform;                        
                        });

                        if(platformArray.length>0) {
                            angular.forEach(platformArray, function(platform) {
                               
                                var platformList = conceptProposalPlatformDataModel.getFieldList(platform.code);  
                                platformObject.proposal.plannedPlatforms.forEach(function(ppl) {   /// Platform list iteration                              
                                  /// Accordion iteration, if both platform matches, then it is that section of accordion and 
                                  /// items inside it
                                  if(ppl.platform.id === platform.id) {

                                            /// Business Model 
                                            conceptCommonServiceField.field(platformList.businessModel).value(ppl.businessModel);  
                                            
                                            /// DCI Intensio     
                                            conceptCommonServiceField.field(platformList.dlcIntension).value(ppl.dlcIntension);
                                            
                                            /// exclusiveAtLaunch  
                                            conceptCommonServiceField.field(platformList.exclusiveAtLaunch).value(toYesNo(ppl.exclusiveAtLaunch));

                                            // offlineMultiplayer 
                                            conceptCommonServiceField.field(platformList.offlineMultiplayer).value(toYesNo(ppl.offlineMultiplayer));                                        

                                            // onlineMultiplayer 
                                            conceptCommonServiceField.field(platformList.onlineMultiplayer).value(toYesNo(ppl.onlineMultiplayer));
                                              
                                            // Timeline - plannedRegions                                            
                                            if(ppl.plannedRegions) {
                                                
                                                var plannedPlatformArray = angular.copy(ppl.plannedRegions);
                                                plannedPlatformArray.forEach(function(plannedRegion,index){
                                                    if(plannedRegion.releaseDate.date) {
                                                        plannedRegion.releaseDate.date = $filter('date')(plannedRegion.releaseDate.date, 'yyyy-MM-dd'); 
                                                        plannedPlatformArray[index] =  plannedRegion;                                                  
                                                    }
                                                });
                                                conceptCommonServiceField.field(platformList.plannedRegions).value(plannedPlatformArray);                                               
                                            }                                              

                                            /// plannedDistributionMedia
                                            var plannedDistributionMediaArray = [];
                                            angular.forEach(ppl.plannedDistributionMedia, function(plannedMedia, index) {
                                                plannedDistributionMediaArray[index] = plannedMedia.id;                                            
                                            });

                                            if(plannedDistributionMediaArray.length>0) {
                                                conceptCommonServiceField.field(platformList.plannedDistributionMedia).value(plannedDistributionMediaArray);    //[10000,1,0]                                   
                                            }

                                            /// plannedPeripherals                                         

                                            if(ppl.plannedPeripherals) {
                                                ppl.plannedPeripherals.forEach(function(peripheral) {  
                                                    conceptWidgetServiceCore.plannedPeripherals.map(function (perip) {                                                    
                                                        if(perip.id == peripheral.peripheral.id) {
                                                            conceptCommonServiceField.field(platformList.plannedPeripherals + '_' + peripheral.peripheral.id).value(toYesNo(peripheral.required));                                                         
                                                        }                                                    
                                                    });                                                
                                                });   
                                            };                                        

                                            /// Languages Supported  
                                            if(ppl.plannedLanguages) {
                                                var plannedLanguages = [];
                                                ppl.plannedLanguages.forEach(function(language,index) {
                                                   plannedLanguages[index] = language.isocode;                                           
                                                }); 

                                                if(plannedLanguages.length>0) {
                                                    conceptCommonServiceField.field(platformList.plannedLanguages).value(plannedLanguages);
                                                }; 
                                            }                                            

                                            /// Vibration - Planned Features                                        
                                            //conceptCommonServiceField.field(platformList.plannedFeatures).value([0]);  /// Not working                                      
                                  }                               
                                });
                            });                               
                        };
                    }                    
                });
        };

        function toYesNo(objectConvert) {
            return angular.lowercase($filter('yesNo')(objectConvert)); 
        }
	};	

	/***
			Load the local storage routine for the compliance page
	***/

	function loadCompliance(scope) {
        console.log('******* conceptlocalDataService:loadCompliance ******* Function has not been used.');
        return;
        
		if(conceptLocalStorage.getDraftStorage()) {
			var complianceObject = conceptLocalStorage.getDraftStorage();                 
       
            $timeout(function() {

                // Set OCC Compliance
                conceptCommonServiceField.field('compliance.occCompliance').value(complianceObject['compliance'].occCompliance);
                // TODO - Remove helper once response is Yes not YES
                conceptWidgetServiceCore.occ.model(scope.helper(complianceObject['compliance'].occCompliance));
                // Set OCC Complicance comment
                conceptCommonServiceField.field('compliance.occComplianceComment').value(complianceObject['compliance'].occComplianceComment);  
                // Set Virtual Currency Compliance
                conceptCommonServiceField.field('compliance.virtualCurrencyCompliance').value(complianceObject['compliance'].virtualCurrencyCompliance);   
                // Set Virtual Currency Compliance comment
                conceptCommonServiceField.field('compliance.virtualCurrencyComplianceComment').value(complianceObject['compliance'].virtualCurrencyComplianceComment);   
                // Set Legal Disclaimer
                conceptCommonServiceField.field('compliance.legalDisclaimerAccepted').value(complianceObject['compliance'].legalDisclaimerAccepted);                 

            }) // End timout
        };
	}	
};