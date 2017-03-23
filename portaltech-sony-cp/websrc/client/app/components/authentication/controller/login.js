'use strict';

// User Login authentication
angular.module('authentication').controller('authenticationControllerLogin',
    ['User', 'OAuth', 'oauth2401Redirect', '$location', '$state',
        function authenticationControllerLogin(User, OAuth, oauth2401Redirect, $location, $state) {
            this.login = {
                username: 'ross.grimes',
                password: 'partner'
            };

            this.submit = angular.bind(this, function submit() {
                OAuth.getAccessToken(this.login).then(function then(response) {

                    if(response.status == 200) {
                        User.currentUser();

                        var backUrl = oauth2401Redirect.back();
                        if (!backUrl || backUrl === $location.path()) {
                            $state.go('index.concept.listing');
                        }

                    }

                });
        });
    }
]);
