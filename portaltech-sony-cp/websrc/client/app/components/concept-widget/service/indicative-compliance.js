angular.module('conceptWidget').service('conceptWidgetServiceCompliance',
function conceptWidgetServiceCompliance(
    conceptWidgetServiceCore,
    conceptCommonServiceField
) {

   		this.fields = [
            {
                name: 'compliance.occCompliance',
                config: 'occ'
            },
            {
                name: 'compliance.virtualCurrencyCompliance',
                config: 'virtualcurrency'
            }
        ].map(function fieldsMap(obj) {           

            var map = {
                radio: {
                    name: obj.name,
                    config: conceptWidgetServiceCore[obj.config]
                },
                comment: {
                    name: obj.name + 'Comment'
                }
            };     

            [
                'radio',
                'comment'
            ].forEach(function forEach(prop) {
                map[prop].model = conceptCommonServiceField.field(map[prop].name);
                if(map[prop].model.value()==='YES') {
                    map[prop].model.value('Yes');
                }   
                if(map[prop].model.value()==='NO') {
                    map[prop].model.value('No');
                }          
            });
            return map;
        });

});