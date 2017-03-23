
angular.module('conceptProposal').filter('countryName',
    function(conceptCommonServiceConfig, $filter){
        return function(isocode) {
            this.languages = (this.languages) ? this.languages : conceptCommonServiceConfig.config('languages');
            var country = $filter('filter')(this.languages, {'isocode':isocode})[0];
            return country.name;
        };
    }
);