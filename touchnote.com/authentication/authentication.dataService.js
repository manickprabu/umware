(function() {
    'use strict';

    angular
        .module('touchNote.authentication')
        .service('authenticationService', authenticationService);

    authenticationService.$inject = [ '$q', 'dataStore', 'api' ];

    function authenticationService($q, dataStore, api) {

        var service = {
            registerUser: registerUser,
            loginUser: loginUser,
            forgottenPassword: forgottenPassword,
            resetPassword: resetPassword,
            checkUserHaveSocial: checkUserHaveSocial,
            loginUserViaFacebook: loginUserViaFacebook,
        };

        return service;

        // -------- Hoistable Functions --------
        function registerUser(firstName, lastName, password, emailAddress) {
            return api.post('/account/v4/signup', {
                request: {
                    type: 'signup',
                    user: {
                        email: emailAddress,
                        password: password,
                        first_name: firstName,
                        last_name: lastName,
                        date_of_birth: 0,
                        username:null,
                        newsletter_opt_in: false
                    }
                }
            });
        }

        function loginUser(userEmail, userPassword) {
            return api.post('/account/v4/signin', {
                request: {
                    type: 'signin',
                    user: {
                        email: userEmail,
                        password: userPassword,
                        username:null,
                        billing_country_id: 1
                    }
                }
            });
        }

        function checkUserHaveSocial(userEmail) {
            return api.post('/account/v4/check-social-account', {
                request: {
                    type: 'check-social-account',
                    user: {
                        email: userEmail
                    }
                }
            });
        }

        function loginUserViaFacebook(options) {
            return api.post('/account/v4/social-signin', {
                request: {
                    type: 'social-signin',
                    user: {
                        email:options.socialEmail
                    },
                    social: {
                        social_id: options.socialID,
                        social_key: '63a34a58a2fef08c7eb85b7fe1f294bb022719d0aace0f4dae3eea14b50b6c92560a3d1fa7f4485',
                        social_platform: 'facebook',
                        social_accesstoken: options.accessToken,
                        social_user_id: options.userID
                    }
                }
            });
        }

        function resetPassword() {

        }

        function forgottenPassword(userEmail) {
            return api.post('/account/v4/forgotten-password', {
                request: {
                    type: 'forgotten-password',
                    user: {
                        email: userEmail,
                        username: userEmail
                    }
                }
            });
        }
    }

})();