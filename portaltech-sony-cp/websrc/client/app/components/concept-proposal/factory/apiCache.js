angular.module('conceptProposal').factory('conceptProposalFactoryAPICache',
function conceptProposalFactoryAPICache($cacheFactory) {
    return $cacheFactory('apiCache');
});
