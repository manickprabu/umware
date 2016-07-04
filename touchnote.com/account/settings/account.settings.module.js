(function() {
    'use strict';

    var module = angular.module('touchNote.account');

    module.controller('AccountSettingsController', AccountSettingsController);

    AccountSettingsController.$inject = [ '$scope', 'config', '$timeout', 'accountDataService', 'dialog', 'dataStore', 'Address', 'UserDetails', 'Password' ];

    function AccountSettingsController($scope, config, $timeout, accountDataService, dialog, dataStore, Address, userDetails, Password) {

        /*jshint validthis: true */
        var vm = this;
        vm.saving = null;
        vm.pattern = config.pattern;
        vm.formReady = false;
        vm.email = userDetails.email();
        vm.uuid = dataStore.get('userUUID');
        vm.homeAddress = userDetails.getHomeAddress();
        vm.address = vm.homeAddress.address();

        //hide when user login with facebook credential
        vm.socialUser = dataStore.get('socialUser');

        $scope.changeEmail = changeEmail;
        $scope.changePassword = changePassword;

        vm.fieldMap = { };
        vm.fields = vm.address.getFields();
        for (var index in vm.fields) {
            vm.fieldMap[vm.fields[index].name] = index;
        }

        var requiredFields = [
            'line1', 'town', 'countryID', 'postalCode'
        ];

        vm.countries = vm.fields[vm.fieldMap.countryName].data;
        vm.selectedCountry = vm.address.country;

        $scope.checkFormValidity = checkFormValidity;

        $scope.$watch('vm.address.countryID', function() {

            if (!$('#contactsAddFormModal .step1').hasClass('completed')) {
                $('#contactsAddFormModal .step1').addClass('transition');
            }

            vm.address.setCountry(vm.address.countryID);
            vm.selectedCountry = vm.address.country;

            if ((vm.address.countryID != 1) && (vm.formType == 1)) {
                vm.formType = 0;
            }

            vm.fields = vm.address.getFields();

            for (var index in vm.fields) {
                vm.fieldMap[vm.fields[index].name] = index;
            }

            vm.fields[vm.fieldMap.postalCode].pattern = vm.selectedCountry.postalCodeRegex;
            vm.fields.postalCode = null;

            requiredFields = [
                'line1', 'town', 'countryID', 'postalCode'
            ];

            // UK does not require county
            if (vm.address.countryID !== 1) {
                requiredFields.push('state');
            }

            checkFormValidity();

        });

        $scope.isRequiredField = function(field) {
            return (vm.addressForm.validated  && vm.addressForm
                    && requiredFields.indexOf(field.name) != -1
                    && vm.addressForm['Address'+field.name].$error.required )
        };

        $scope.saveAddress = function() {
            var form = vm.addressForm;
            form.validated = true;
            var errorField = checkFormValidity();

            if ((!vm.formReady) || (vm.saving)) {
                for(var index in vm.fields) {
                    if( vm.fields[index].name == errorField) {
                        vm.homeAddressError = 'Please enter a valid ' + String(vm.fields[index].placeholder).toLowerCase();
                        if(errorField == 'line1') {
                            vm.homeAddressError = 'Please enter the first line of your address';
                        }
                        break;
                    }
                }

                return;
            }
            vm.saving = true;
            vm.homeAddressError = false;

            vm.homeAddress.addresses[0] = vm.address;
            userDetails.setHomeAddress(vm.homeAddress);
            accountDataService.setHomeAddress( vm.homeAddress ).then(function() {
                vm.saving = false;
            });
        };

        return this;
        ////////////

        function changeEmail() {
            var form = vm.newEmail;
            vm.updatingEmail = false;
            form.validated = true;

            if (form.$valid && !form.$submitted) {
                vm.updatingEmail = true;
                form.errorMessage = '';

                accountDataService
                    .changeEmail(form.email, vm.uuid, form.currentPassword)
                    .then(function(response) {
                        form.validated = false;
                        vm.updatingEmail = false;
                        if (response.status != 'error') {
                            dialog.alert('Message', 'Email updated!');

                            userDetails.email(response.new_email);
                            vm.email = response.new_email;

                            delete form.email;
                            delete form.currentPassword;

                            dataStore.set('user_token', response.tn_access_token, true);
                            dataStore.set('tnAccessToken', response.tn_access_token, true);
                        }
                        else if (response.error_code === 'ERROR_AUTHENTICATION') {
                            dialog.alert('Check your password', 'The current password is not correct');
                        }
                        else {
                            dialog.alert('Check your email', 'This email is already linked to another Touchnote account');
                        }

                        form.$submitted = false;

                    }, function(error) {
                        console.log(error);
                        form.$submitted = false;
                        vm.updatingEmail = false;
                    });
            } else {
                form.errorMessage = 'Please enter valid email and password';
                $timeout(function() {
                    form.$submitted = false;
                }, 10);
            }
        }

        function changePassword() {
            var form = vm.changePassword;

            var newPassword = Password.validatePassword(form.newPassword || '', form.confirmPassword || '');
            vm.updatingPassword = false;
            form.validated = true;

            if (form.$valid && !form.$submitted) {

                //validate password
                if(newPassword != true) {
                    $scope.passswordMsg = newPassword;
                    $timeout(function() {
                        form.$submitted = false;
                    }, 10);
                    return;
                }

                $scope.passswordMsg = '';
                vm.updatingPassword = true;
                accountDataService
                    .changePassword(vm.email, form.currentPassword, form.newPassword, vm.uuid)
                    .then(function(response) {
                        form.validated = false;
                        if (response.status === 'success') {
                            dialog.alert('Message', 'Password updated - Your password has been updated! Use your new password next time you sign in.');

                            delete form.currentPassword;
                            delete form.newPassword;

                        } else {
                            var msg = response.error_message.replace(/(^[a-z])/,function (p) { return p.toUpperCase(); } );
                            dialog.alert('Oops', msg);
                        }

                        delete form.confirmPassword;
                        form.$submitted = false;
                        vm.updatingPassword = false;
                    }, function(error) {
                        console.log(error);
                        form.$submitted = false;
                        vm.updatingPassword = false;
                    });
            } else {
                delete form.confirmPassword;
                if( !form.currentPassword ) {
                    $scope.passswordMsg = 'Please enter your current password';
                } else if(newPassword != true){
                    $scope.passswordMsg = newPassword;
                }

                $timeout(function() {
                    form.$submitted = false;
                }, 10);
            }
        }

        function checkFormValidity() {

            for (var fieldNameIndex in requiredFields) {
                var fieldName = requiredFields[fieldNameIndex];

                if ((typeof(vm.address[fieldName]) === 'undefined') || (!vm.address[fieldName]) || (vm.address[fieldName] === '')) {
                    // console.log(fieldName + " not defined");
                    vm.formReady = false;
                    return fieldName;
                }
            }

            vm.formReady = true;

        }

    }

})();
