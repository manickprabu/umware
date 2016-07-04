(function() {
    'use strict';

    angular
        .module('touchNote.account')
        .service('accountDataService', accountDataService);

    accountDataService.$inject = [ 'api' ];

    function accountDataService(api) {

        var service = {
            changeEmail: changeEmail,
            changePassword: changePassword,
            checkCredit: checkCredit,
            getHomeAddress: getHomeAddress,
            setHomeAddress: setHomeAddress,
            setBillingAddress: setBillingAddress
        };

        return service;

        // -------- Hoistable Functions --------

        function changeEmail(email, uuid, password) {
            return api.post('/account/v4/change-email', {
                request: {
                    type: 'change-email',
                    user: {
                        uuid: uuid,
                        new_email: email,
                        password: password
                    }
                }
            });
        }

        function changePassword(email, current_password, password, uuid) {
            return api.post('/account/v4/updateaccount', {
                request: {
                    type: 'updateaccount',
                    user: {
                        email: email,
                        username: email,
                        current_password: current_password,
                        password: password,
                        uuid: uuid
                    }
                }
            });
        }

        function setHomeAddress(person) {
            var homeAddress = person.addresses[0];
            var renderedAddress = homeAddress.renderForServer();
            renderedAddress.address_type_id = 1;
            renderedAddress.first_name = person.name();

            return api.post('/account/v4/updateaccount', {
                request: {
                    type: 'updateaccount',
                    addresses: [renderedAddress]
                }
            });
        }

        function checkCredit(email) {
            return api.post('/account/v4/checkcredit', {
                request: {
                    type: 'check_credit'
                }
            });
        }

        function setBillingAddress(person) {
            var address = person.addresses[0];
            var renderedAddress = address.renderForServer();
            renderedAddress.address_type_id = 2;
            renderedAddress.first_name = person.name();

            return api.post('/account/v4/reset-payment-token', {
                request: {
                    type: 'reset-payment-token',
                    user: {
                        billing_country_id: address.country.id
                    },
                    address: renderedAddress
                }
            });
        }

        function getHomeAddress() {
            return api.post('/address/v4/gethomeaddress', {
                'request': {
                    'type' : 'gethomeaddress'
                }
            });
        }

    }
})();