(function() {
    'use strict';

    var module = angular.module('touchNote.account');

    module.controller('AccountTestModalController', AccountTestModalController);

    AccountTestModalController.$inject = [ '$scope', '$state', 'dataStore' ];

    function AccountTestModalController($scope, $state, dataStore) {

        /*jshint validthis: true */
        var vm = this;

        return vm;

    }

})();
