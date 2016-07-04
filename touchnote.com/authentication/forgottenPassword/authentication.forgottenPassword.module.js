(function() {
    'use strict';

    var module = angular.module('touchNote.authentication');

    module.controller('AuthenticationForgottenPasswordController', AuthenticationForgottenPasswordController);

    AuthenticationForgottenPasswordController.$inject = [ '$scope', 'config', 'authenticationService', '$log', 'dialog', '$state' ];

    function AuthenticationForgottenPasswordController($scope, config, authenticationService, $log, dialog, $state) {

        /*jshint validthis: true */
        var vm = this;
        vm.pattern = config.pattern;

        $scope.forgottenPassword = forgottenPassword;

        return this;
        ///////////////

        function forgottenPassword() {
            var form = vm.forgottenPassword;
            vm.validated = true;

            if (form.$valid && !form.$submitted) {
                setMessage('Submitting...');
                checkForSocialUser(form);
                form.$submitted = true;
            } else {
                setMessage('Please enter your email...', true);
            }
        }

        //ceck whether user linked with facebook or not.
        function checkForSocialUser(form) {
            authenticationService.checkUserHaveSocial(form.email)
                .then(function(response){
                    vm.validated = false;
                    if(response.status == 'success' && response.social.social_id != '') {
                        dialog.alert( 'Sorry!', 'This account is linked to Facebook. You can only change the password via Facebook.');
                    } else if(response.status == 'success') {
                        submitForgottenPassword(form);
                    } else {
                        setMessage("Sorry, we can't find an account for that email", true);
                    }
                    form.$submitted = false;
                }).catch(function(error) {
                    $log(error);
                    form.$submitted = false;
                    vm.validated = false;
                });
        }

        function submitForgottenPassword(form) {
            authenticationService.forgottenPassword(form.email)
                .then(function(response) {
                    if (response.status === 'success') {
                        setMessage('', false);
                        saySuccess();
                    } else {
                        setMessage("Sorry, we can't find an account for that email", true);
                    }
                    form.$submitted = false;
                }, function(error) {
                    $log(error);
                    form.$submitted = false;
                });
        }

        function saySuccess() {
            dialog.show({
                title: 'Done!',
                message: 'We\'ve sent you an email with a link to reset your password.',
                options: [
                    { text: 'OK', default: true, callback: function() { 
                            dialog.cancel();
                            closeModal();
                            $state.go('top.homepage');
                        } 
                    }
                ]
            });
        }

        function setMessage(message, error, success) {
            vm.errorMessage = error || false;
            vm.successMessage = success || false;
            vm.message = message || 'Please enter your email and password to sign in.';
        }
    }
})();
