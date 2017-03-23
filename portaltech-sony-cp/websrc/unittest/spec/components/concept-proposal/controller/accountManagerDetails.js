describe("conceptProposalControllerAccountManagerDetails",
function conceptProposalControllerAccountManagerDetails(){
    var scope;
    var controller;
    var uibmodal;
    var conceptProposalServiceConcept;

    beforeEach(function beforeEach() {
        module('conceptProposal');
        inject(function inject(
            $controller,
            $rootScope,
            $injector,
            _conceptProposalServiceConcept_ ) {
                conceptProposalServiceConcept = _conceptProposalServiceConcept_;
                uibmodal = jasmine.createSpyObj('uibmodal',['close']);
                scope = $rootScope.$new();
                scope = {
                    $resolve: {
                        concept: ''
                    }
                }
                controller = $controller("conceptProposalControllerAccountManagerDetails", {
                    $scope: scope,
                    $uibModalInstance: uibmodal,
                    conceptProposalServiceConcept : _conceptProposalServiceConcept_
                });
            });
    });

    it("Calling close should close bootstrap modal", function(){
        controller.closeModal();
        expect(uibmodal.close).toHaveBeenCalled();
    })

    it("Calliing message should query service for message", function(){
        spyOn(conceptProposalServiceConcept, 'message');
        var output = controller.message('mock');
        expect(conceptProposalServiceConcept.message).toHaveBeenCalled();
    })

});
