describe('ConfirmActionController', function ConfirmActionController() {
    beforeEach(function() {
        module('ui.router');
        module('wp3-product-group');
    });

    var $controller, $rootScope, scope, uibmodal, state, controller;

    beforeEach(inject(function(_$controller_, _$rootScope_, _$state_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        state = _$state_;
        scope = $rootScope.$new();
        uibmodal = jasmine.createSpyObj('uibmodal', ['close', 'open']);
        state = {
            go: function(state) {}
        }

        controller = $controller('ConfirmActionController', {
            $scope: scope,
            $uibModal: uibmodal,
            $state: state,
        });
        controller.modal = uibmodal;

    }));
    describe('Loading controller', function() {
        it('close should be defined', function() {
            expect(controller.close).toBeDefined();
        });
    });

    describe('Loading controller', function() {
        it('open should be defined', function() {
            expect(controller.open).toBeDefined();
        });
    });

    describe('Loading controller', function() {
        it('confirm should be defined', function() {
            expect(controller.confirm).toBeDefined();
        });
    });

    describe('Loading controller and triggering open', function() {
        it('should open modal confirmation modal', function() {
            controller.open();
            expect(uibmodal.open).toHaveBeenCalled();
        });
    });

    describe('Loading controller and triggering confirm', function() {
        it('Should change state to product group page', function() {
            spyOn(state, 'go');
            controller.confirm();
            expect(state.go).toHaveBeenCalledWith('index.productgroup.type')
        });
    });

    describe('Loading controller and triggering cancel', function() {
        it('should close confirmation modal', function() {
            controller.close();
            expect(uibmodal.close).toHaveBeenCalled();
        });
    });


});
