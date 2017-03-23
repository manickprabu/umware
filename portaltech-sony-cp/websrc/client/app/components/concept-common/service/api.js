// All functions in this service are API calls which return promises.
angular.module('conceptCommon').service('conceptCommonServiceAPI',
    function conceptCommonServiceAPI(
        $http,
        $q,
        conceptProposalFactoryAPICache,
        oauth2FactoryHeaders,
        sharedAPIConstantURL
    ) {
        var baseUrl = sharedAPIConstantURL + '/concepts';
        function options(obj) {
            return angular.extend({
                headers: oauth2FactoryHeaders()
            }, obj || {});
        }

        this.validate = function validate(concept) {
            return $http.post(baseUrl + '/validate', concept, options());
        };
        this.init = function init() {
            return $http.put(baseUrl + '/init', {}, options());
        };
        this.save = function save(concept) {
            return $http.put(baseUrl + '/save', concept, options());
        };
        this.submit = function submit(concept) {
            return $http.put(baseUrl + '/submit', concept, options());
        };
        this.config = function config() {
            return $http.get(baseUrl + '/configuration', options({
                cache: conceptProposalFactoryAPICache
            }));
        };
        
        this.details = function details(id) {              
            return $http.get(baseUrl + '/' + id, options());
        };

        this.conceptFilter = function conceptFilter(filters) {
            return $http.get(baseUrl, options({params:filters}));
        };
        this.updateConcept = function updateConcept(id, concept) {
            return $http.patch(baseUrl + '/' + id + '/proposal', concept, options());
        };

        this.list = function list(filters) {
            return $http.get(baseUrl, options({params:filters}));
        };

        this.genres = function genres() {
            return $http.get(sharedAPIConstantURL + '/genres', options());
        };

        ///PATCH : API /sonycpocc/v2/sonycp/concepts/1/proposal/feedback
        this.savefeedback = function (id, review) {
            var fullUrl = baseUrl + '/' + id + '/proposal/feedback';
            return $http.patch(fullUrl, review, options());
        };
        //load currentUser status
        this.currentUser = function currentUser() {
            return $http.get(sharedAPIConstantURL + '/users/current', options());
        };
        this.loadReviewer = function loadReviewer() {
            return $http.get(sharedAPIConstantURL + '/users?type=REVIEWER', options());
        };

        //Franchises 
        this.getFranchises = function getFranchises() {
            return $http.get(sharedAPIConstantURL + '/franchises', options());
        };
        this.createFranchise = function createFranchise(franchise) {
            return $http.put(sharedAPIConstantURL + '/franchises', franchise, options());
        };

        ///Patch: API /sonycpocc/v2/sonycp/concepts/1/
        this.updateinternalreview = function (id, concept) {
            return $http.patch(baseUrl + '/' + id, concept, options());
        };

    });

