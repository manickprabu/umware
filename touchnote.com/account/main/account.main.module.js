(function() {
    'use strict';

    var module = angular.module('touchNote.account');

    module.controller('AccountMainController', AccountMainController);

    AccountMainController.$inject = [ '$scope', '$state', 'accountDetails', 'dataStore', 'user', 'UserDetails', 'touchNoteCard' ];

    function AccountMainController($scope, $state, accountDetails, dataStore, user, userDetails, touchNoteCard) {

        if (!dataStore.get('authenticated')) {
            $state.go('top.homepage');
            return;
        }

        /*jshint validthis: true */
        var vm = this;

        vm.user = dataStore.get('userDetails').user;
        $scope.credits = userDetails.credits();

        $scope.startCard = function(type) {
            touchNoteCard.startCard(null, {productType:type, action:'NEW'});
        }

        user.getAccountDetails(true).then(function() {
            //$state.go('top.account.cardHistory');
        });

        $scope.$on('$viewContentLoaded', function(){
            if ($state.current.name == 'top.account') {
                $state.go('top.account.cardHistory');
            }
        });

        dataStore.unbindAll('userDetailsUpated');
        dataStore.bind('userDetailsUpated', function(){
           $scope.credits = userDetails.credits();
        });

        return this;
        ///////////

    }

})();
