angular.module('conceptCommon').service('conceptCommonServiceConfig',
function conceptCommonServiceConfig(conceptCommonServiceAPI) {
    // DTO represents a concept object that might be received from the API
    // or can be passed into the API.
    
    var data = {
        config: null,
        genres: null      
    };

    function resolve() {
        //load genres
        conceptCommonServiceAPI.genres().then(
            function config(response) {
                data.genres = response.data.superGenres;
            });        

        //only config promise will be resolved
        return conceptCommonServiceAPI.config().then(function(response) {
                data.config = response.data;
            });
    }

    function config(name) {
        return typeof data.config === 'undefined' ? null : data.config[name];
    }

    function genres() {
        return data.genres;
    }

    return {
        resolve: resolve,
        config: config,
        genres: genres        
    }
    
});
