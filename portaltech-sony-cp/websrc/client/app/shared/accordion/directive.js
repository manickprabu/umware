// Todo: This is a shared module and should NOT be referring to a component module.
// Any such objects need to be passed in or manipulated from outside.
angular.module('sharedAccordion')
    .controller('sharedAccordionController', function(conceptWidgetServiceProposedPlatform){

        /// The instance of sharedMultiSelectFactory
        this.checkboxes = conceptWidgetServiceProposedPlatform.instance;       

        /// Select/check the checkbox for each accordion on click
        this.changeView = function(platform) {            
            platform.selected = !platform.selected;
            if(platform.selected) {
                platform.open = true;
            }
        }

        // Toggle Accordion open or close on click
        this.toggleView = function(platform) {    
            platform.selected = this.selectedView(platform);
            if(platform.selected) {
                platform.open = !platform.open;
            }
        }         

        /// Function runs on click when the accordion checkboxes are 
        /// Pre-selected in edit mode of draft
        this.selectedView = function (platform) {
            var value = this.checkboxes.value()() || [];           
            if(platform.selected === undefined) {                
                value.forEach(function(selectedPlatform) {
                    if(selectedPlatform === platform.id) {
                       platform.selected = true;
                       platform.open = false;
                    };                    
                });
            };
            return platform.selected;
        };
    })

    .directive('sharedAccordion', function sharedAccordion(){
        return {
            restrict:'E',
            scope: { },
            bindToController: true,
            templateUrl: 'app/shared/accordion/accordion.html',
            controllerAs: 'sharedAccordionController',
            controller: 'sharedAccordionController',
        };
    }
);
