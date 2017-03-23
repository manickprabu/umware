
angular.module('conceptWidget').service('conceptWidgetServicePlannedPeripherals',
function conceptWidgetServicePlannedPeripherals(
    conceptOverviewModel,
    conceptWidgetServiceCore,
    conceptCommonServiceField
) {

    this.init = function(platformName) {
        this.fields = conceptOverviewModel.fields(platformName);
        this.field = conceptCommonServiceField.field(this.fields.plannedPeripherals);

        return this.getSelectedPeripherals();
    }

    //update field.value based on user selection
    this.updateFieldValue = function() {
        list = [];
        this.selectedPeripherals.forEach(function(peripheral) {
            if(peripheral.selected) {
                var item = {
                    required: conceptCommonServiceField.field(peripheral.fieldName).value() || false,
                    peripheral:{
                        nameEN: peripheral.peripheral.nameEN,
                        id: peripheral.peripheral.id
                    }
                }
                list.push(item);
            };
        });

        this.field.value(list);
        this.selectAll = this.selectedPeripherals.length === list.length;
    };


    //filter plannedPeripherals by platformName which belongs to current platform
    this.filterPeripherals = function() {
        this.platformPeripherals = conceptWidgetServiceCore.plannedPeripherals.filter(function(peripheral) {
            var platforms = peripheral.peripheral.platforms;
            var exist = platforms.filter(function(platform) {
                return (platform.name == conceptOverviewModel.platformName);
            })
            return (exist.length > 0);
        })
    }

    //create peripherals and return to UI
    //create nested shared-radio instance;
    this.getSelectedPeripherals = function() {
        this.filterPeripherals();

        this.selectedPeripherals = this.platformPeripherals.map(angular.bind(this, function(peripheral) {
            var item = {label: peripheral.label, value : peripheral.id, peripheral:peripheral.peripheral};
                item.fieldName = this.fields.plannedPeripherals+'_'+item.value;
                item.field = conceptWidgetServiceCore.createYesNoField(item.fieldName, angular.bind(this, this.updateFieldValue));

                //preselect from dto object every time load popup
                (this.field.value() || []).map(angular.bind(this, function(val) {
                    if(val.peripheral.id == peripheral.peripheral.id){
                        item.selected = true;
                        // Bind to value field
                        var field = conceptCommonServiceField.field(item.fieldName);
                        if(val.required !== undefined) {
                            field.value(val.required);
                        }
                    }
                }));
            return item;
        }));
        return this.selectedPeripherals;
    }


});
