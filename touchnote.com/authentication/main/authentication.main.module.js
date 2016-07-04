(function() {
    'use strict';

    var module = angular.module('touchNote.authentication');

    module.controller('AuthenticationMainController', AuthenticationMainController);

    AuthenticationMainController.$inject = [ '$scope', '$state'];

    function AuthenticationMainController($scope, $state) {

        /*jshint validthis: true */
        var vm = this;

        return this;

    }

})();
