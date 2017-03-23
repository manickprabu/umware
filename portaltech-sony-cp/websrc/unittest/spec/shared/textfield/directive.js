// ---SPECS for HIT ENTER EVENT for TEXTFIELD-------------------------
xdescribe('Unit Test: Enter Event', function () {
    var elm, compile, scope;

    beforeEach(function () {
        module('sharedTextfield');
        inject(function ($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();
        });
    });

    /*unit test 1*/
    it("Enter Key should call the method inside controller", function () {
        scope.enterEvent = jasmine.createSpy('enterEvent');
        var e = jQuery.Event("keydown",  {
            keyCode: 13
        });
        elm = angular.element('<input type="text" hit-enter-event="enterEvent()">');
        elm = compile(elm)(scope);

        elm.trigger(e);
        scope.$digest();

        expect(scope.enterEvent).toHaveBeenCalled();
    });
});