(function() {
    'use strict';

    var module = angular.module('touchNote.authentication');

    module.controller('AuthenticationRegisterController', AuthenticationRegisterController);

    AuthenticationRegisterController.$inject = ['$scope', 'authenticationService', 'dataStore', '$state', 'user', '$timeout', 'config',
        'accountDataService', 'Person', 'Address', 'contactsDataService', 'UserDetails', 'Password', '$window' ];

    function AuthenticationRegisterController($scope, authenticationService, dataStore, $state, user, $timeout, config,
        accountDataService, Person, Address, contactsDataService, userDetails, Password, $window) {

        /*jshint validthis: true */
        var vm = this;
        vm.spinButton = false;
        vm.pattern = config.pattern;
        //pre-populate user details from facebook request;
        $timeout( function(){
            var socialUserObject = dataStore.get('socialUserObject');
            if(socialUserObject) {
                vm.signUpForm.name     = socialUserObject.first_name;
                vm.signUpForm.surname  = socialUserObject.last_name;
                vm.signUpForm.email    = socialUserObject.email;
            }
            dataStore.set('socialUserObject', null);
        }, 100);

        setMessage();

        //renamed from signUpForm to signUpForm submit, just to avoid confusion with vm.signUpForm and improve readability
        $scope.signUpFormSubmit = signUpFormSubmit;

        $scope.openTermsCondis = function() {
            $window.open('https://www.touchnote.com/#/info/terms', '_blank');
        };

        // @TODO: open popup to add home address after register

        return this;
        ///////////////

        function signUpFormSubmit() {
            var form = vm.signUpForm;
            form.validated = true;

            var passwordMsg = Password.validatePassword(form.password || '');

            if (form.$valid && !form.$submitted ) {
                
                //validate password
                if(passwordMsg != true) {
                    setMessage(passwordMsg, true);
                    return;
                }

                setMessage('Attempting to create your account...');

                vm.spinButton = true;
                form.$submitted = true;

                authenticationService
                    .registerUser(form.name, form.surname, form.password, form.email)
                    .then(function(response) {
                        var responseUser = response.user;
                        vm.spinButton = false;
                        form.validated = false;

                        //track facebook pixel event for CompleteRegistration.
                        fbq('track', 'CompleteRegistration', {status:response.status});
                        
                        if (response.status == 'error') {
                            return handleError(response);
                        }

                        // change header after login (angular watch on this)
                        userDetails.update(response);

                        // localStorageService.cookie.set key, val, expire
                        dataStore.set('user_token', responseUser.tn_access_token, true);
                        dataStore.set('tnAccessToken', responseUser.tn_access_token, true);

                        userDetails.email(responseUser.email);
                        dataStore.set('userUUID', responseUser.uuid, true);

                        dataStore.set('availableCredits', responseUser.credits, true);

                        user.authenticate(true);

                        addUserHomeAddress();

                        contactsDataService.syncContacts();

                        //remove form data
                        delete form.email;
                        delete form.password;
                        delete form.name;
                        delete form.surname;

                        resetSubmitted();

                    }, function(error) {
                        setMessage(error, true);
                        resetSubmitted();
                    });
            } else {
                resetSubmitted();
                
                // setMessage('Please enter your valid details to sign up...', true);
                if(!form.name) {
                    setMessage('Please enter valid first name', true);
                    return;
                } else if(!form.surname) {
                    setMessage('Please enter valid last name', true);
                    return;
                } else if(!form.email) {
                    setMessage('Please enter valid email', true);
                    return;
                } else if(!form.password) {
                    setMessage(passwordMsg, true);
                    return;
                }
            }
        }

        function resetSubmitted(value) {
            $timeout(function() {
                //vm.signUpForm disappeared after sign up, a workaround to avoid exception thrown
                if (vm.signUpForm) {
                    vm.signUpForm.$submitted = value;
                }
            },1);
        }

        function addUserHomeAddress() {

            var person = new Person({ firstName: userDetails.fullName() });
            var address = person.address();
            address.setCountry( dataStore.get('baseCountry', {id:1}).id );

            dataStore.unbindAll('editAddress');
            dataStore.set('hideName', false);
            modalStack = [ ];

            dataStore.set('addBillingAddress', true);
            dataStore.set('editAddress', { address: address, recipientName: person.name() });

            var bindIndex = dataStore.bindOnce('editAddress', function() {

                var formAddress = dataStore.get('editAddress');
                person.addresses[0] = formAddress.address;

                userDetails.setHomeAddress(person);
                accountDataService.setHomeAddress(person);

                checkAndGotoPayment();
            }, $scope);

            dataStore.set('hideName', true);

            dataStore.set('cancelModalHandler', function() {
                // console.log('Cancelled the creation of the home address.');
                dataStore.unbind('editAddress', bindIndex);
                if ($state.current.name == 'top.homepage') { 
                    $state.go('top.account'); 
                }
            });

            dataStore.set('modalTitle', 'Enter your home address');

            $state.go('top.contacts.addForm');

        }

        //take user into payment screen if the sing-up trigger card creation flow
        function checkAndGotoPayment() {
            // After Sign In Method Specified
            if ((dataStore.get('afterSuccessfulSignIn') !== null) && (typeof(dataStore.get('afterSuccessfulSignIn')) == 'function')) {
                dataStore.get('afterSuccessfulSignIn').call();
            }
        }

        function setMessage(message, error) {
            vm.errorMessage = error || false;
            vm.message = message || 'Please enter your details to sign up.';
        }

        function handleError(response) {
            vm.signUpForm.$submitted = false;
            switch (response.error_code) {

                // Account already exists
                case 'USERNAME_ALREADY_EXISTS':
                    setMessage('We already have an account for that email address.', true);
                    break;

                // Default
                default:
                    setMessage('Something unexpected happened and we couldn\'t create your account.', true);
                    break;
            }

        }
    }
})();