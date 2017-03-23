angular.module('conceptCommon').service('conceptCommonServiceFranchise',
function conceptCommonServiceFranchise(conceptCommonServiceAPI) {
    // DTO represents a concept object that might be received from the API
    // or can be passed into the API.
    
    var data = {
        franchises: null
    };

    function franchises() {
        return data.franchises;
    }

    function fetchFranchises() {
        return conceptCommonServiceAPI.getFranchises().then(
            function getFranchises(response) {
                data.franchises = response.data.franchises;
            });
    };

    return {        
        franchises: franchises,
        fetchFranchises: fetchFranchises       
    }
    
});
