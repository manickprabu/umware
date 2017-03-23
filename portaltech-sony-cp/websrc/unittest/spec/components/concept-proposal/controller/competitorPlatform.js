describe('conceptProposalControllerCompetitorPlatform', function conceptProposalControllerCompetitorPlatform() {
    var scope;
    var controller;
    var conceptProposalServiceConcept;
    var conceptProposalServiceConfig;

    beforeEach(function beforeEach() {
        module('conceptProposal');
        inject(function inject(
            $controller,
            $rootScope,
            $injector,
            _sharedMultiSelectFactory_,
            _conceptProposalServiceConcept_,
            _conceptProposalPlatformDataModel_,
            _conceptProposalServiceConfig_) {
            conceptProposalServiceConcept = _conceptProposalServiceConcept_;
            conceptProposalServiceConfig = _conceptProposalServiceConfig_;
            scope = $rootScope.$new();
            controller = $controller('conceptProposalControllerCompetitorPlatform', {
                $scope: scope,
                conceptProposalPlatformDataModel: _conceptProposalPlatformDataModel_
            });
        });
    });

    xit('proposed platforms are initialized', function responseFormat() {
        // mock platforms
        var mockPlatforms = [{
            name: 'mockPlatform1',
            code: 'mockPlatform1'
        }, {
            name: 'mockPlatform2',
            code: 'mockPlatform2'
        }, {
            name: 'mockPlatform3',
            code: 'mockPlatform3'
        }];
        // platform not defined until concept is initialized
        expect(controller.platforms).not.toBeDefined();
        // is initialized should still be false
        expect(conceptProposalServiceConcept.isInitialized).toBe(false);

        spyOn(conceptProposalServiceConcept, 'config').and.returnValue(mockPlatforms);

        // act
        conceptProposalServiceConcept.isInitialized = true;

        // trigger digest to make our watch fire
        scope.$digest();

        // assert
        expect(conceptProposalServiceConcept.config).toHaveBeenCalled();

        expect(JSON.stringify(conceptProposalServiceConfig.platforms)).toBe(JSON.stringify({
            mockPlatform1: 'mockPlatform1',
            mockPlatform2: 'mockPlatform2',
            mockPlatform3: 'mockPlatform3'
        }));

        expect(controller.platforms).toBeDefined();
    });

    xit('calling select all platforms should toggle isSelectAllPlatformsActive',
        function responseFormat() {
            // initially platforms can be 'select all'
            expect(controller.isSelectAllPlatformsActive).toBe(false);

            // act
            controller.toggleSelectAllPlatforms();

            // asert
            expect(controller.isSelectAllPlatformsActive).toBe(true);
        });

    it('calling select all platforms should select all the platforms',
        function responseFormat() {
            // mock data
            controller.competitorPlatforms = [{
                id: 0,
                name: 'mock platform 1'
            }, {
                id: 1,
                name: 'mock platform 2'
            }];
            // expect starting condition
            expect(controller.isSelectAllPlatformsActive).toBe(false);

            // act
            controller.toggleSelectAllPlatforms();

            // asert
            expect(controller.isSelectAllPlatformsActive).toBe(true);

            for (var i = 0; i < controller.competitorPlatforms.length; i++) {
                // each competitor platform should be selected 
                expect(controller.competitorPlatforms[i].isSelected).toBe(true);
            }
        });

    it('calling deselect all platforms should select all the platforms',
        function responseFormat() {
            // mock data
            controller.competitorPlatforms = [{
                id: 0,
                name: 'mock platform 1'
            }, {
                id: 1,
                name: 'mock platform 2'
            }];
            // force state to be "deselect all"
            controller.isSelectAllPlatformsActive = true;

            // expect starting condition
            expect(controller.isSelectAllPlatformsActive).toBe(true);

            // act
            controller.toggleSelectAllPlatforms();

            // asert
            expect(controller.isSelectAllPlatformsActive).toBe(false);

            for (var i = 0; i < controller.competitorPlatforms.length; i++) {
                // each competitor platform should be selected 
                expect(controller.competitorPlatforms[i].isSelected).toBe(false);
            }
        });

    it('toggle selected competitor should toggle the platforms selected state correctly', function() {

        var mockPlatform = {
            name: 'mock platform',
            id: 0,
            isSelected: false
        };

        controller.toggleSelectCompetitorPlatform(mockPlatform);

        expect(mockPlatform.isSelected).toBe(true);

        controller.toggleSelectCompetitorPlatform(mockPlatform);

        expect(mockPlatform.isSelected).toBe(false);
    });
});
