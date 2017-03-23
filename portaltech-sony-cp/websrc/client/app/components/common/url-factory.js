'use strict';

//User object holds all user information.
angular.module('common').factory('URLFactory', function(oauth2FactoryHeaders)
{
  // base url
  var baseUrl = '/sonycpocc/v2/sonycp/concepts/';

  this.headers  = function options(obj) {
      return angular.extend({
          headers: oauth2FactoryHeaders()
      }, obj || {});
  }

  this.productGroupTypes = function (conceptId) {
    return baseUrl + conceptId + '/storeproductgroups/types';
  }

  return this;
});
