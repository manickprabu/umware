(function() {
    'use strict';

    var module = angular.module('touchNote.authentication');

    module.controller('AuthenticationSignInController', AuthenticationSignInController);

    AuthenticationSignInController.$inject = [ '$scope', 'config', '$timeout', '$state', 'dialog', 'browser', 'authenticationService', 'dataStore', 
            'Facebook', 'user', 'contactsDataService', 'Address', 'accountDataService', 'UserDetails', 'rememberMe' ];

    function AuthenticationSignInController($scope, config, $timeout, $state, dialog, browser, authenticationService, dataStore, 
            Facebook, user, contactsDataService, Address, accountDataService, userDetails, rememberMe) {

        /*jshint validthis: true */
        var vm = this;
        vm.showProgress = false;
        vm.pattern = config.pattern;

        setMessage();
        $scope.signInForm = signInForm;
        $scope.signInFacebook = signInFacebook;

        return this;
        ///////////////

        function signInFacebook() {
            if(window.FB) {
                $state.go('top.authentication.facebook');
            } else {
                dialog.alert( 'Opps!', 'Your <b>' + browser.get() + '</b> does not support facebook signin, please try using other browser.');
            }
        }

        function signInForm() {
            var form = vm.signInForm;
            
            form.validated = true;

            if(form.$valid && !form.$submitted) {
                vm.showProgress = true;
                setMessage('Signing in...');

                authenticationService
                    .loginUser(form.email, form.password)
                    .then(function(response) {
                        form.validated = false;

                        if(response.status === 'success') {

                            // change header after login (angular watch on this)
                            userDetails.update(response);
                            dataStore.set('socialUser', false, true);

                            // localStorageService.cookie.set key, val, expire
                            dataStore.set('user_token', response.user.tn_access_token, true);
                            dataStore.set('tnAccessToken', response.user.tn_access_token, true);
                            userDetails.email(response.user.email);
                            dataStore.set('userUUID', response.user.uuid, true);
                            user.updateUser();

                            dataStore.set('availableCredits', response.user.credits, true);
                            

                            // remove form data
                            delete form.email;
                            delete form.password;

                            vm.showProgress = false;
                            user.authenticate(true);
                            rememberMe.start(vm.rememberMe);

                            accountDataService.getHomeAddress().then(function(response) {
                               //console.log("HOME ADDRESS:", response);
                               var address = new Address( response.homeaddress );
                               if(!response.homeaddress) {
                                   address.setCountry( dataStore.get('baseCountry', {id:1}).id );
                               }
                               userDetails.setHomeAddress(address);
                            });

                            // After Sign In Method Specified
                            if ((dataStore.get('afterSuccessfulSignIn') !== null) && (typeof(dataStore.get('afterSuccessfulSignIn')) == 'function')) {
                                dataStore.get('afterSuccessfulSignIn').call();
                            }

                            contactsDataService.syncContacts();

                            if ($state.current.name == 'top.homepage') {
                                $state.go('top.account');
                            }

                            // close modal popup
                            closeModal();

                        } else {
                            vm.showProgress = false;
                            switch (response.error_code) {
                                case 'PASSWORD_NOT_CORRECT':
                                    setMessage('Oops. That is not the right password.', true);
                                    break;
                                default:
                                    setMessage(response.error_message, true);
                                    break;
                            }
                        }
                        // allow user to submit again
                        resetSubmitted();

                    }, function(error) {
                        console.log(error);
                        resetSubmitted();
                    });
            } else {
                // Invalid password. (Not long enough)
                if(!form.email) {
                    setMessage('Please enter valid email', true);
                    return;
                } else if(!form.password) {
                    setMessage('Please enter valid password', true);
                } else if (typeof(form.password) == 'undefined') {
                    setMessage('Oops. Your password must be at least 6 characters long.', true);
                    return;
                }
            }
            // allow user to submit again
            //form.$submitted = true;
        }

        function resetSubmitted(value) {
            $timeout(function() {
                vm.signInForm.$submitted = value;
            },1);
        }

        function setMessage(message, error) {
            vm.errorMessage = error || false;
            vm.message = message || 'Please enter your email and password to sign in.';
        }

    }
})();
