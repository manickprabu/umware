(function() {
    'use strict';

    angular
        .module('touchNote.authentication')
        .run(main);

    main.$inject = [ 'statehelper' ];

    /* @ngInject */
    function main(statehelper) {
        statehelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                stateName: 'top.authentication',
                config: {
                    parent: 'top',
                    views: {
                        'modal@top': {
                            templateUrl: 'app/modules/authentication/main/authentication.main.html',
                            controller: 'AuthenticationMainController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        modal: true
                    }
                }
            },
            {
                stateName: 'top.authentication.signIn',
                config: {
                    parent: 'top.authentication',
                    views: {
                        'authenticationView': {
                            templateUrl: 'app/modules/authentication/signIn/authentication.signIn.html',
                            controller: 'AuthenticationSignInController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        modal: true
                    }
                }

            },
            {
                stateName: 'top.authentication.register',
                config: {
                    parent: 'top.authentication',
                    views: {
                        'authenticationView': {
                            templateUrl: 'app/modules/authentication/register/authentication.register.html',
                            controller: 'AuthenticationRegisterController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        modal: true
                    }
                }

            },
            {
                stateName: 'top.authentication.homeAddress',
                config: {
                    parent: 'top.authentication',
                    views: {
                        'authenticationView': {
                            templateUrl: 'app/modules/authentication/homeAddress/authentication.homeAddress.html',
                            controller: 'AuthenticationHomeAddressController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        modal: true
                    }
                }

            },
            {
                stateName: 'top.authentication.forgottenPassword',
                config: {
                    parent: 'top.authentication',
                    views: {
                        'authenticationView': {
                            templateUrl: 'app/modules/authentication/forgottenPassword/authentication.forgottenPassword.html',
                            controller: 'AuthenticationForgottenPasswordController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        modal: true
                    }
                }

            },
            {
                stateName: 'top.authentication.facebook',
                config: {
                    parent: 'top.authentication',
                    views: {
                        'authenticationView': {
                            templateUrl: 'app/modules/authentication/facebook/authentication.facebook.html',
                            controller: 'AuthenticationFacebookController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        modal: true
                    }
                }

            }


        ];
    }
})();
