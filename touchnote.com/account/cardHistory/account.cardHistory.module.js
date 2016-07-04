(function() {
    'use strict';

    var module = angular.module('touchNote.account');

    module.directive('loadOnScroll', ['$window', function($window) {
        return {
            restrict:'A',
            link:link
        };

        function link(scope, element, attr) {
            var _window = angular.element($window),
                footerHeight = 200;

            _window.bind('scroll', scrollList);
            scope.$on('$destroy', function() {
                _window.unbind('scroll', scrollList);
            });

            function scrollList() {
               if($(window).scrollTop() + $(window).height() >= $(document).height()-footerHeight) {
                    scope.$apply(attr.loadOnScroll);
               }
            }
        }
    }]);


    module.controller('AccountCardHistoryController', AccountCardHistoryController);

    AccountCardHistoryController.$inject = [ '$scope', '$state', '$animate', 'accountDataService', 'orderService', 
            'touchNoteDraftService', 'dataStore', 'touchNoteCountriesListService', 'TouchNoteCard', 'config', 'touchNoteCard',
            '$timeout', '$filter', 'dialog', 'Order', '$stateParams', 'UserDetails' ];

    function AccountCardHistoryController($scope, $state, $animate, accountDataService, orderService, 
            touchNoteDraftService, dataStore, touchNoteCountriesListService, TouchNoteCard, config, touchNoteCard,
            $timeout, $filter, dialog, Order, $stateParams, userDetails) {

        var vm = this,
            orderList = [],
            constant = config.constant,
            orders = {},
            lastOrderID = $stateParams.lastOrderID,
            latestTimestamp = dataStore.get('latestOrderTimestamp', 0),
            isExpectingNewOrder = false;

        $scope.showGreetingsCardAddress = showGreetingsCardAddress;
        $scope.loadOnScroll = loadOnScroll;
        $scope.showDraft  = showDraft;
        $scope.copyCard = copyCard;
        $scope.cancelCard = cancelCard;
        $scope.loadHistory = loadHistory;
        $scope.showAddress = {};

        $scope.loadingHistory = true;

        $timeout(loadDrafts, 50);

        orders = dataStore.get('orderHistory', { });
        formatOrdersforUI();

        //if redirected from order placement page, show visual card as draft first
        if(lastOrderID) {
            isExpectingNewOrder = true;
        }

        //$timeout(loadHistory, 20000);
        $scope.loadHistory();

        $scope.deleteDraft = function(cardID) {

            dialog.show({
                title: 'Delete draft',
                message: 'Are you sure do you want to delete this draft?',
                options: [
                    { text: 'Not now', class:'white', default: true, callback: function() {
                                dialog.cancel();
                            }
                    },
                    { text: 'OK', default: true, callback: function(){
                            dialog.cancel();
                            touchNoteDraftService.deleteDraft(cardID);
                            loadDrafts();
                        }
                    }
                ]
            });
            
        };

        return this;


        //update order history
        function loadHistory() {
            orderService.getOrderHistory(latestTimestamp).then(orderHistoryLoaded);
        }

        // -------- Hoistable Functions --------//
        function loadOnScroll() {
            var loadCount = 5; //load only 5 order when scroll hit bottom;

            while(loadCount > 0 && vm.orders.length < orderList.length) {
                var order = orderList[vm.orders.length];
                vm.orders.push(order);
                loadCount--;
            }
            $scope.showMoreCardBtn = (vm.orders.length < orderList.length);
        }

        function copyCard(order, draft) {
            var orderID = order.orderID || order.serverOrderID;
            var extra = {productType:order.template.productType, action:'COPY', order:order, draft:draft};
            
            touchNoteCard.startCard(orderID, extra);
        }

        //This method cancel order or selected card
        function cancelCard(order, product, cancelCard) {

            //check anything in progress
            if(order.cancelInProgress) {
                return;
            }

            var what = (cancelCard) ? 'card' : 'order';
            var products = (cancelCard) ? {0:product} : order.products;
            var cardIDList = [];
            angular.forEach(products, function(product) {
                if(product.canCancelCard()) {
                    this.push(product.realCardID);
                }
                
            }, cardIDList);

            var credit = cardIDList.length * userDetails.product_prices[product.productType.toLowerCase()];
            var credit = (credit == 1) ? 'one credit' : credit + ' credits';
            var msg = 'This '+what+' will not be sent and ' + credit + ' will be added to your account.';
                msg += (order.cardCount > 1 && cancelCard) ? '<br> Cancelling this card will not affect the other cards within this order.' : '';

            dialog.show({
                title: 'Cancel this '+what+'?',
                message: msg,
                options: [
                    { text: 'Cancel '+what,  default: true, callback: function() {
                            order.cancelInProgress = true;
                            dialog.cancel();

                            orderService.cancelOrder(cardIDList).then(function(response) {
                                delete order.cancelInProgress;
                                if(response[0].status == 'success') {

                                    angular.forEach(products, function(product) {
                                        product.status = 'REJECTED';
                                    });

                                    if(order.cardCount == 1 || !cancelCard){
                                        order.status = 'REJECTED';
                                    }

                                    accountDataService.checkCredit( userDetails.email() ).then(function(response) {
                                        dataStore.set('userDetailsUpated');
                                    });
                                    dialog.alert( '', 'This '+what+' has been cancelled and your '+((credit == 1) ? 'credit' :'credits')+' refunded. If you change your mind, simply copy the '+what+' and send!');
                                }
                            });
                        }
                    },
                    { text: 'Keep '+what, class:'white', default: true, callback: function(){
                            dialog.cancel();
                        }
                    }
                ]
            });
        }

        function orderHistoryLoaded(response) {
            var order, orderKeys, orderInfo, cards;
            
            //just update credits.
            dataStore.set('userDetailsUpated');

            for (var i in response.orders) {
                order = response.orders[i];
                orderKeys = Object.keys(order);
                orderInfo = order.orderInfo;
                cards = {};

                // Remove order info and reindex
                delete(orderKeys[orderKeys.indexOf('orderInfo')]);
                orderKeys.sort();

                // Everything Remaining is a Card Instance
                for (var cardIDIndex in orderKeys) {
                    var card = order[orderKeys[cardIDIndex]];
                    card.formattedCreationDate  = moment.unix(card.created).format('Do MMM YYYY');
                    card.address.country_name   = touchNoteCountriesListService.getCountry(card.address.country_id).name;
                    card.address.name           = (card.address.last_name) ? card.address.firstName + ' '  + card.address.lastName : card.address.first_name;

                    cards[orderKeys[cardIDIndex]] = card;
                }
                orderInfo.cards = cards;
                orderInfo.cardCount = Object.keys(cards).length;

                //update selected card or all cards from Order when card('s') status changes (i.e: rejeted,approved)
                var orderExist = orders[orderInfo.id];
                if(orderExist && orderExist.cards.getLength() === orderInfo.cards.getLength()) {
                    angular.extend(orderExist, orderInfo);
                } else if(orderExist){
                    angular.extend(orderExist.cards, orderInfo.cards);
                } else { //new order
                   orders[orderInfo.id] = orderInfo;
                }
            }

            if (response.last_updated > latestTimestamp) {
                latestTimestamp = response.last_updated;
            }

            dataStore.set('latestOrderTimestamp', latestTimestamp, true);
            dataStore.set('orderHistory', orders, true);
            formatOrdersforUI();

            //new card expected from server, keep requesting until get the target
            if (isExpectingNewOrder && _.isEmpty(response.orders)) {
                $timeout(loadHistory, 2000);
                return;
            }

            if (isExpectingNewOrder) {
                touchNoteDraftService.deleteLastDraft();
                loadDrafts();
            }

            $scope.loadingHistory = false;
            isExpectingNewOrder = false;
        }

        function formatOrdersforUI(lastOrder) {
            vm.orders = [];
            orderList = filterOrders(orders);

            if(lastOrder) {
                orderList.unshift(lastOrder);
            }
            orderList = $filter('orderBy')(orderList, '-lastUpdated');
            loadOnScroll();
        }

        function filterOrders(orders) {
            var returnedOrders = [ ];

            for (var i in orders) {
                var order = orders[i];
                if (order.cards.getLength()) {
                    var _order = new Order(order);
                    _order.template = _order.getProduct(0);
                    _order.updateMyRecipient();
                    returnedOrders.push(_order);
                }
            }

            return returnedOrders;
        }

        function showDraft(orderID) {
            var draft = touchNoteDraftService.getDraft(orderID);
            if (typeof(draft.orderID) !== 'undefined') {
                touchNoteCard.startCard(orderID, {productType:draft.template.productType} );
            }
        }

        function showGreetingsCardAddress(index) {
            $scope.showAddress[index] = !$scope.showAddress[index];
            if ($('.gc-index'+index).hasClass('close-gce')) {
                $animate.removeClass($('.card-index'+index), 'close-gce');
                $animate.removeClass($('.gc-index'+index+' .gce-top'), 'close-gcet').then(function() {
                    $animate.removeClass($('.gc-index'+index), 'close-gce');
                });
            } else {
                $animate.addClass($('.card-index'+index), 'close-gce');
                $animate.addClass($('.gc-index'+index), 'close-gce').then(function() {
                    $animate.addClass($('.gc-index'+index+' .gce-top'), 'close-gcet');
                });
            }
        }

        function loadDrafts() {
            var drafts = touchNoteDraftService.listDrafts();
            vm.draftList = drafts;
            vm.drafts = [ ];

            for (var orderID in drafts) {
                var draft = drafts[orderID];
                draft.recipientCount = Object.keys(draft.recipients).length;
                draft.lastUpdate = draft.lastUpdate || Date.now();
                draft.formattedLastUpdate = moment.unix(draft.lastUpdate / 1000).fromNow(); //.format('LL');
                vm.drafts.push(draft);

                draft.template.validateThumbnail();
            }

        }
    }

})();
