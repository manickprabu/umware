(function() {
    'use strict';

    angular.module('touchNote.account')
        .controller('EditCardMessageModel', editCardMessageModel);

    editCardMessageModel.$inject = [ '$scope'];

    function editCardMessageModel($scope) {
        var vm = this;

        $scope.remainingLine = 0;
        $scope.onEditing = true;

        vm.message = dataStore.get('editCardMessage');
        vm.postcard = (typeof vm.message == 'string');
        vm.greetingCard = (typeof vm.message == 'object');

        $scope.submit = function() {
            dataStore.set('editCardMessage', vm.message);

            closeModal();
        }

        $scope.dismiss = function() {
            closeModal();
        };

        return this;
    }

})();