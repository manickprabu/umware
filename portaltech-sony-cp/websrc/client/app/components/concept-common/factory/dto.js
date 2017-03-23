angular.module('conceptCommon').factory('conceptCommonFactoryDTO',
function conceptCommonFactoryDTO(conceptCommonServiceAPI) {
    // DTO represents a concept object that might be received from the API
    // or can be passed into the API.
    function DTO(data) {
        // Handles the API call where objectData is a property of the response, extending the API
        // object with the data.
        // This assumes that all necessary data changes would be overwritten properly by the API
        // response.
        function extendData(response) {
            return angular.extend(data, response.data.objectData);
        }

        // Fetch the concept object.
        this.fetch = function fetch(id) {
            // Run the API based on the id.
            return conceptCommonServiceAPI.details(id).then(angular.bind(this, function then(response) {
                // Persist the object extending against 'data'
                angular.extend(data, response.data);
                return this;
            }));
        };

        // Save a draft of the concept object.
        this.save = function save() {
            return conceptCommonServiceAPI.save(data).then(extendData);
        };

        // Submit the concept object.
        this.submit = function submit() {
            return conceptCommonServiceAPI.submit(data).then(angular.bind(this, function(response){
                extendData(response);

                return response;
            }));
        };

        // Expose the data.
        this.data = data;
    }

    // Instantiate the class.
    return function instantiate(data) {
        return new DTO(data);
    };
});
