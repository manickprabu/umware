'use strict';

angular.module('conceptProposal').controller('conceptProposalControllerInformationPartner',
function conceptProposalControllerInformationPartner(
    $uibModal,
    sharedOptionsFactory,
    sharedDropdownFactoryCore,
    sharedDropdownFactoryFirst,
    sharedMultiSelectFactory
) {
    this.list = sharedDropdownFactoryCore({
        partner1: 'Partner 1',
        partner2: 'Partner 2',
        partner3: 'Partner 3',
        partner4: 'Partner 4'
    }, {
        placeholder: 'Select a partner'
    });
    this.add = sharedDropdownFactoryFirst('Add New Partner', function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: [
                'app/components/concept-proposal/partial/view/information-partner-modal.html'
            ].join(''),
            controller: function ($uibModalInstance) {
                this.roles = sharedOptionsFactory({
                    developer: 'Developer',
                    publisher: 'Publisher'
                });
                this.distribution = sharedMultiSelectFactory({
                    digital: 'Digital',
                    physical: 'Physical',
                    streaming: 'Streaming'
                });
                this.platforms = sharedMultiSelectFactory({
                    ps4: 'PS4',
                    ps3: 'PS3',
                    vita: 'VITA'
                });
                this.ok = function () {
                    $uibModalInstance.close({ stuff: 'things' });
                };
                this.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            controllerAs: 'conceptProposalControllerInformationPartnerModal',
            size: 'lg'
        });

        modalInstance.result.then(function (response) {
            console.log(response);
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    });
});
