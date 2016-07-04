(function() {
    'use strict';

    angular.module('touchNote.authentication')
    .controller('AuthenticationFacebookController', 
        ['$scope', 'Facebook', 'authenticationService', 'user', '$state', 'dialog', 'dataStore', 'contactsDataService', 'accountDataService', 'Address', 'UserDetails',
        function($scope, Facebook, authenticationService, user, $state, dialog, dataStore, contactsDataService, accountDataService, Address, userDetails){
            var vm = this;
    
            $scope.checkFacebookTNApi = checkFacebookTNApi;
            loginUserViaFacebook();

            function loginUserViaFacebook() {
                vm.showProgress = true;
                setMessage('Facebook sign in...');
                Facebook.login(function(data) {
                    if (data.status === 'connected') {
                        //to check user hav social
                        Facebook.api('/me', function(response) {
                            vm.facebook = response;
                            checkFacebookTNApi(response, data);
                        });
                    } else {
                        vm.showProgress = false;
                        //redirect into sign-in
                        $state.go('top.authentication.signIn');
                    }
                }, { scope: 'email' });
            }

            function checkFacebookTNApi(response, socialData) {
                vm.response   = response || vm.response;
                vm.socialData = socialData || vm.socialData;
                var email = vm.response.email || vm.signInForm.email;
                
                if( angular.isDefined(email) ) {
                    setMessage('Facebook sign in...');
                    vm.showProgress = true;
                    authenticationService.checkUserHaveSocial(email)
                        .then(function(response){
                            _checkUserHaveSocial(response, vm.socialData);
                        })
                        .catch(showError);
                } else {
                    vm.showProgress = false;
                    _redirectSignIn2Normal();
                }
            }

            function _checkUserHaveSocial(response, socialData) {
                if (response.status === 'success') {
                    if (!response.social || !response.social.social_email) {
                        _redirectSignIn2Normal();
                    } else {
                        var email = vm.facebook.email;
                        var params = {
                            socialEmail : email,
                            socialID : response.social.social_id,
                            accessToken : socialData.authResponse.accessToken,
                            userID : socialData.authResponse.userID
                        };
                        authenticationService.loginUserViaFacebook(params)
                            .then(_loginUserViaFacebook)
                            .catch(showError);
                    }
                } else {
                    _redirectSignIn2Normal();
                }
            }

            //helper method;
            function _redirectSignIn2Normal() {
                dataStore.set('socialUserObject', vm.response);

                dialog.show({
                    title: 'Opps!',
                    message: 'This Facebook account is not connected to Touchnote. Please try again, or sign in via email.',
                    options: [
                        { text: 'OK', default: true, callback: function() {
                                dialog.cancel();
                                $state.go('top.authentication.register');
                            } 
                        }
                    ]
                });
            }

            function _loginUserViaFacebook(response) {
                if (response.status === 'success') {
                    dataStore.set('user_token', response.user.tn_access_token, true);
                    dataStore.set('tnAccessToken', response.user.tn_access_token, true);
                    dataStore.set('userUUID', response.user.uuid, true);
                    userDetails.email(response.user.email);

                    dataStore.set('availableCredits', response.user.credits, true);

                    //TO DO - move this into proper USER object to access across application 
                    dataStore.set('socialUser', true, true);
                    
                    user.authenticate(true);

                    accountDataService.getHomeAddress().then(function(response) {
                       // console.log("HOME ADDRESS:", response);
                       var address = new Address( response.homeaddress );
                       if(!response.homeaddress) {
                           address.setCountry( dataStore.get('baseCountry', {id:1}).id );
                       }
                       // dataStore.set('homeAddress', address, true);
                       userDetails.setHomeAddress(address);
                    });

                    contactsDataService.syncContacts();

                    // close modal popup
                    closeModal();
                    
                    if ($state.current.name == 'top.homepage') {
                        $state.go('top.account');
                    }
                } else {
                    dialog.alert( 'Opps!', 'There\'s been a problem and we can\'t sign you in using Facebook.');
                }
            }

            function showError(error) {
                console.log(error);
            }

            function setMessage(message, error) {
                vm.errorMessage = error || false;
                vm.message = message || 'Please enter your details to sign up.';
            }

        }
    ]);
})();