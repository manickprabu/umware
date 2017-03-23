angular.module('conceptProposal').service('util',
function () {

    // usage: pass an array like ['item1', 'item3', 'item3']
    // returns: json object like { item1: 'item1', item2: 'item2', item3: 'item3'}
    this.arrToJsonKeys = function(arr, keyName, valueName) {
        // bail if null 
        if(arr === null) {
            return {};
        }
        // new json object
        var jsonObj = {};
        // build jsonObj
        arr.forEach(function(arrItem) {

            if(typeof(keyName) !== 'undefined' && typeof(valueName) !== 'undefined') {
                jsonObj[arrItem[keyName]] = arrItem[valueName];
            } else {
                jsonObj[arrItem] = arrItem;
            }
        });

        return jsonObj;
    }
});
