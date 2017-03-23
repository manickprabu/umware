angular.module('conceptOverviewEdit').controller('conceptOverviewEditControllerCore',
function conceptOverviewEditControllerCore(conceptWidgetServiceCore, conceptCommonServiceField, conceptCommonServiceManager) {
    this.config = conceptWidgetServiceCore;
    this.field = conceptCommonServiceField.field;
    this.concept = conceptCommonServiceManager.concept();

    // Fields categorised by type to loop through, reducing code repetition.
    this.fields = {
        // Consecutive name (text) fields.
        names: [
            'nameEN',
            'nameJA',
            'codeNameEn'
        ],

        // Dropdown field objects generated with associated dropdown configurations.
        dropdowns: [
            'superGenre',
            'categoryGenre'
        ].map(angular.bind(this, function (name) {
            var instance = this.config[name];
            return {
                name: name,
                instance: instance
            };
        })).concat([
            {
                name: 'franchise',
                instance: this.config.franchise.core
            }
        ])
    };

    //update value from dto object since 'nameJA', 'codeNameEn', 'codeNameJa' is not available on init/validate
    this.fields.names.forEach(angular.bind(this, function(name){
        if(this.concept[name]) {
            conceptCommonServiceField.field(name).value( this.concept[name] );
        }
    }));
    

    this.config.superGenre.update()();
});