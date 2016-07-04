(function() {
    'use strict'

    var module = angular.module('touchNote.account');

    module.controller('AddressBuyCreditController', AddressBuyCreditController);

    AddressBuyCreditController.$inject = [ '$scope', 'dialog', 'dataStore', 'Address', 'UserDetails', 'paymentService', '$timeout' ];

    function AddressBuyCreditController($scope, dialog, dataStore, Address, userDetails, paymentService, $timeout) {

        var vm = this;
        $scope.step = 1;
        
        $scope.goto = function(what) {
            $scope.step = what;
        }

        return vm;
    }


    module.controller('CreditPacksController', CreditPacksController);

    CreditPacksController.$inject = [ '$scope', '$compile', '$state', 'dataStore', 'dialog', 'touchNoteDraftService', 'paymentService', 'config', '$filter', 'UserDetails', '$timeout' ];

    function CreditPacksController($scope, $compile, $state, dataStore, dialog, touchNoteDraftService, paymentService, config, $filter, userDetails, $timeout) {
        var vm = this;

        vm.creditPacks = [];
        vm.currencySymbol = userDetails.currencySymbol();
        vm.pricePerCredit = userDetails.cardPrice();
        vm.loading = true;
        vm.extraBack = [];
        vm.backSavings = paymentService.backSavings;
        $scope.credits = userDetails.credits();

        //calculage extra back based on last largest back.. 
        function calculateExtraBack(lastBack) {

            for(var i=1; i<=2; i++) {
                vm.extraBack.push({
                    price : lastBack.total_price * (i * 2),
                    creditCount : lastBack.num_credits * (i * 2),
                    image:''
                });
           }
        }

        paymentService.initialize().then(function() {
            vm.loading = false;
            var creditPacks = dataStore.get('creditPacks');
            $scope.credits = userDetails.credits();

            calculateExtraBack( creditPacks[creditPacks.length-1] );

            for (var i in creditPacks) {
                var creditPack = creditPacks[i];

                if (i < 4) {
                    vm.creditPacks.push({
                        price: Number(creditPack.total_price).toFixed(2),
                        creditCount: creditPack.num_credits,
                        image: 'assets/images/smile0' + (parseInt(i) + 1) + '.png'
                    });
                }
            }

            $scope.setCreditPack(vm.creditPacks[0], 0);
            $timeout(function() {
                dataStore.set('paymentReady');
            }, 1000);
        });

        $scope.setCreditPack = function(pack) {
            vm.selectedCreditPack = pack;
            dataStore.set('selectedCreditPack', pack);
        };

        $scope.selectCreditPackAuto = function(pack) {
           $scope.setCreditPack(pack, -1);
           $scope.payForCredits();
        }

        $scope.payForCredits = function() {

            if(vm.selectedCreditPack) {
                $scope.goto(2);
            }
        };

        return vm;
    }


    module.controller('CreditPaymentController', CreditPaymentController);

    CreditPaymentController.$inject = [ '$scope', '$state', 'dataStore', 'dialog', 'paymentService', 'config', '$filter', 'UserDetails', '$timeout', 'paymentHelper', 'accountDataService', 'touchNoteCard' ];

    function CreditPaymentController($scope, $state, dataStore, dialog, paymentService, config, $filter, userDetails, $timeout, paymentHelper, accountDataService, touchNoteCard) {
        var vm = this;
        vm.paymentMethod = 'cc';
        vm.formReady = true;
        vm.processingPayment = null;

        $scope.processPayment = checkBillingAddressAndPay;
        $scope.changeBillingAddress = paymentHelper.changeBillingAddress;

        //listion when pament server loaded...
        dataStore.unbindAll('paymentReady');
        dataStore.bind('paymentReady', _paymentReady);
        function _paymentReady() {
            var btData = dataStore.get('btData');
            vm.paymentMethod = (btData.tokenType == 'p') ? 'pp' : 'cc';
        }

        $('.btn-group button').click(function (e) {
            var role = $(this).attr('role');

            $('#tapGroup').find('.active').removeClass('active'); //remove all active class

            //$('#tapGroup .btn-group [role='+role+']').addClass('active'); //set tap active
            $('#tapGroup').find('.'+role).addClass('active'); //set view active
            $scope.setPaymentMethod( role );
        });

        $scope.setPaymentMethod = function(role) {
            vm.paymentMethod = role;
        }

        dataStore.unbindAll('paymentStatus');
        dataStore.bind('paymentStatus', function() {
            //console.log('PAYMENT STATUS:', dataStore.get('paymentStatus'));

            switch (dataStore.get('paymentStatus')) {

                case 'processing':
                    paymentHelper.showProcessingDialog();
                    break;

                case 'success':
                    handleSuccessfulPayment();
                    break;

                case 'failed':
                    paymentHelper.handleFailedPayment(dataStore.get('paymentError'));
                    break;
            }
        }, $scope);

        return vm;

        function checkBillingAddressAndPay() {
            var billingAddress = userDetails.getBillingAddress();
            if (billingAddress.address().line1 === null) {

                dataStore.set('cancelModalHandler', function() {
                    // console.log('CANCEL MODAL HANDLER');
                    goTo( touchNoteDraftService.getLastDraft().orderID );
                });

                paymentHelper.changeBillingAddress(setupPayments);
            } else {
                //update billing address very first from home address
                if(billingAddress.address().addressType === 1) {
                    accountDataService.setBillingAddress(billingAddress);
                }
                setTimeout(setupPayments, 100);
            }
        }

        function setupPayments() {

            if (vm.processingPayment !== null) {
                return;
            }
            
            dataStore.set('postPaymentProcessor', null);
            dataStore.set('paymentMethod', vm.paymentMethod);
            switch (vm.paymentMethod) {

                case 'cc':
                    var cardDetails = dataStore.get('cardDetails');
                    if (cardDetails && cardDetails.showForm) {

                        var cardNumber = cardDetails.cardNumber;
                        var expiration = cardDetails.expiration.month + '/' + (cardDetails.expiration.year).toString().substr(2,2);
                        var cvv = cardDetails.cvv;

                        if ((!cardNumber) || (!cardDetails.validCardNumber)) {
                            dialog.show({ message: 'You must enter a valid credit card number', options: [ { text: 'OK', default: true, callback: function() { dialog.cancel(); $('.creditCardForm input[name=\'cardNumber\']').focus(); } } ] });
                            return;
                        }

                        if (!cvv) {
                            dialog.show({ message: 'You must enter your CVV', options: [ { text: 'OK', default: true, callback: function() { dialog.cancel(); $('.creditCardForm input[name=\'cvv\']').focus(); } } ] });
                            return;
                        }

                        vm.processingPayment = 'processing';

                        // Check Payment (HTML) Form Validation
                        paymentService.tokenizeCard(cardNumber, expiration, cvv).then(function(nonce) {

                            dataStore.set('tokenizedNonce', nonce);

                            $timeout(function() {
                                vm.processingPayment = null;
                                payForCredits();
                            });

                        }, function(error) {
                            handleFailedPayment(error);
                        });

                    } else {
                        $timeout(function() {
                            vm.processingPayment = null;
                            payForCredits();
                        });
                    }
                    break;

                case 'pp':
                    var btData = dataStore.get('btData', {});
                    var paypalNonce = dataStore.get('paypalNonce');
                    if(btData.tokenType == 'p' || paypalNonce) {
                        $timeout(function() {
                            vm.processingPayment = null;
                            payForCredits();
                        }); 
                   } else {
                        dialog.alert( 'PayPal not yet authorised', 'Please click on the PayPal button and authorise PayPal purchases via Touchnote.');
                   }

                    break;
            }
        }

        function payForCredits() {

            closeModal();

            vm.selectedCreditPack = dataStore.get('selectedCreditPack');
            dataStore.set('paymentStatus', 'processing');

            dataStore.set('showOrderStatusNotice', true);

            if (vm.paymentMethod == 'cc') {
                paymentService.submitPayment(vm.paymentMethod, dataStore.get('tokenizedNonce'), vm.selectedCreditPack.creditCount).then(handleSuccessfulPayment, paymentHelper.handleFailedPayment);
            } else {
                paymentService.submitPayment(vm.paymentMethod, paymentService.getPaypalNonce(), vm.selectedCreditPack.creditCount).then(handleSuccessfulPayment, paymentHelper.handleFailedPayment);
            }

        };

        function handleSuccessfulPayment() {
            var saved = ((userDetails.cardPrice() * vm.selectedCreditPack.creditCount) - vm.selectedCreditPack.price);
            saved = Number(saved).toFixed(2);

            dataStore.set('userDetailsUpated');
            
            dialog.set({
                image: 'assets/images/ready_to_go.png',
                title: 'You have '+ userDetails.credits()+' credits',
                message: 'Nice work! You just saved '+userDetails.currencySymbol()+saved+'. <br />Are you ready to send some postcards?',
                options: [
                    {
                        text: 'Not now', class: 'white',
                        callback: function () {
                            $state.go('top.account');
                            dialog.cancel();
                        }
                    },
                    {
                        text: 'Start a postcard', class: 'red', default: true,
                        callback: function() {
                            dialog.cancel();
                            touchNoteCard.startCard(null, {productType:'PC', action:'NEW'});
                        }
                    }
                ]
            });
        }
    }
 


})();