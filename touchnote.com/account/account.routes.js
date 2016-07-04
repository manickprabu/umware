(function() {
    'use strict';

    angular
        .module('touchNote.account')
        .run(main);

    main.$inject = ['statehelper' ];

    /* @ngInject */
    function main(statehelper) {
        statehelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                stateName: 'top.account',
                config: {
                    url: 'account',
                    parent: 'top',
                    views: {
                        'appView@top': {
                            templateUrl: 'app/modules/account/main/account.main.html',
                            controller: 'AccountMainController',
                            controllerAs: 'vm'
                        }
                    },
                    resolve: {
                        accountDetails: [ '$q', 'user', getAccountDetails ]
                    }
                }

            },
            {
                stateName: 'top.account.cardHistory',
                config: {
                    url: '/cards',
                    parent: 'top.account',
                    views: {
                        'accountContent@top.account': {
                            templateUrl: 'app/modules/account/cardHistory/account.cardHistory.html',
                            controller: 'AccountCardHistoryController',
                            controllerAs: 'vm'
                        }
                    },
                    params: {
                        lastOrderID:null
                    }
                }

            },
            {
                stateName: 'top.account.settings',
                config: {
                    url: '/settings',
                    parent: 'top.account',
                    views: {
                        'accountContent@top.account': {
                            templateUrl: 'app/modules/account/settings/account.settings.html',
                            controller: 'AccountSettingsController',
                            controllerAs: 'vm'
                        }
                    }
                }
            },
            {
                stateName: 'top.account.addressbook',
                config: {
                    url: '/addressbook',
                    parent: 'top.account',
                    views: {
                        'accountContent@top.account': {
                            templateUrl: 'app/modules/account/addressbook/account.addressbook.html',
                            controller: 'AddressBookController',
                            controllerAs: 'vm'
                        }
                    }
                }
            },
            {
                stateName: 'top.account.buycredit',
                config: {
                    url: '/buycredit',
                    parent: 'top.account',
                    views: {
                        'accountContent@top.account': {
                            templateUrl: 'app/modules/account/buycredit/account.buycredit.html',
                            controller: 'AddressBuyCreditController',
                            controllerAs: 'vm'
                        }
                    }
                }
            },
            {
                stateName: 'top.account.resetpassword',
                config: {
                    url: '/resetpassword',
                    parent: 'top.account',
                    views: {
                        'accountContent@top.account': {
                            templateUrl: 'app/modules/account/resetpassword/account.resetpassword.html',
                            controller: 'ResetPasswordController',
                            controllerAs: 'vm'
                        }
                    }
                }
            },
            {
                stateName: 'top.account.testModal',
                config: {
                    parent: 'top.account',
                    views: {
                        'modal@top': {
                            templateUrl: 'app/modules/account/testModal/account.testModal.html',
                            controller: 'AccountTestModalController',
                            controllerAs: 'vm'
                        }
                    },
                    data: {
                        modal: true
                    }
                }

            },
            {
                stateName: 'top.account.editCardMessage',
                config: {
                    parent: 'top.account',
                    views: {
                        'modal@top': {
                            templateUrl: 'app/modules/account/cardHistory/model/editCardMessageModal.html',
                            controller: 'EditCardMessageModel',
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

    function getAccountDetails($q, user) {
        return {};//user.getAccountDetails(true);
    }
})();
