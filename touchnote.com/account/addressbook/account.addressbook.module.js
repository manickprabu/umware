(function() {
    'use strict'

    var module = angular.module('touchNote.account');

    module.controller('AddressBookController', AddressBookController);

    AddressBookController.$inject = [ '$scope', '$timeout', 'dialog', 'dataStore', 'Address', 'UserDetails', 'contactsDataService', '$state', 'Person', '$filter', 'accountDataService' ];

    function AddressBookController($scope, $timeout, dialog, dataStore, Address, userDetails, contactsDataService, $state, Person, $filter, accountDataService) {

        var vm = this, tempList;
        
        vm.filterList = [{label:'All', value:'A-Z'}, {label:'A-E'}, {label:'F-K'}, {label:'L-P'}, {label:'Q-V'}, {label:'W-Z'}];
        filterBy( vm.filterList[0] );
        
        contactsDataService.loadContacts();
        vm.homeAddress = userDetails.getHomeAddress();

        init();

        $scope.editAddress = editAddress;
        $scope.deleteAddress = deleteContactAddress;
        $scope.newAddress = newAddress;
        $scope.filterBy = filterBy;
        
        $scope.currentPage = 1;
        $scope.pageSize = 11;

        $scope.searchBy = function(item) {
            var what = lower($scope.searchText);
            var address = item.address();
            
            if (!$scope.searchText 
                || ( lower(item.name()).indexOf( what ) != -1) 
                || ( lower(address.postalCode).indexOf( what ) != -1)
                || ( lower(address.state).indexOf( what ) != -1) 
                || ( lower(address.town).indexOf( what ) != -1)
                || ( lower(address.line2).indexOf( what ) != -1) 
                || ( lower(address.line1).indexOf( what ) != -1) ){
                return true;
            }
            return false;
        }

        return vm;

        function lower(field) {
            return (field || '').toLowerCase();
        }

        function init() {
            vm.contacts = dataStore.get('contacts', { });

            //filter only recipient Contacts 
            vm.contacts = _.filter(vm.contacts, function(contact) {
                return ((contact.address().addressType === 4) && contact.status != 'DELETED' && contact.address().postalCode );
            });

            if(vm.homeAddress.address().line1)
                vm.contacts.push( vm.homeAddress );
        }

        function filterBy(item) {
            $scope.currentPage = 1;
            vm.selectedFilter = item;
            vm.filterKey = item.value || item.label;
        }

        function deleteContactAddress(contact) {
            dialog.show({
                message: 'Are you sure you want to delete this address?',
                options: [
                    { text: 'Yes', class: 'white',
                        callback: function() {

                            var contactID = contact.personID;
                            var clonedContact = contactsDataService.getContact(contactID);

                            contactsDataService.deleteContact(contactID);

                            for(var i=0, l = vm.contacts.length; i< l; i++) {
                                if(vm.contacts[i].personID == contactID) {
                                    vm.contacts.splice(i, 1);
                                    break;
                                }
                            }
                           
                            backModal();
                            dialog.cancel();
                        }
                    },
                    { text: 'No', default: true, class: 'red',
                        callback: function() { dialog.cancel(); }
                    }
                ]
            });
        }

        function newAddress() {
            dataStore.unbindAll('editAddress');
            dataStore.set('editAddress', new Address({ countryID: 1 }));

            dataStore.set('addBillingAddress', true);

            dataStore.bindOnce('editAddress', function() {
                var formData = dataStore.get('editAddress');

                var contact = new Person({ firstName: formData.recipientName });
                contact.addAddress(formData.address);

                //pre-select new added contact
                var selectedContacts = dataStore.get('selectContacts', { });
                selectedContacts[contact.personID] = contact;
                dataStore.set('selectContacts', selectedContacts);

                contactsDataService.addContact(contact);

                init();

                if (!$scope.$$phase) {
                    $scope.$apply();
                }

            });

            $state.go('top.contacts.addForm');
        };

        function editAddress(contact) {
            var address = contact.address();
            dataStore.set('editAddress', { address: address, recipientName: contact.name(), contact: contact });

            var bindIndex = null;
            dataStore.set('addBillingAddress', true);

            dataStore.unbindAll('editAddress');
            dataStore.bind('editAddress', function() {

                var formAddress = dataStore.get('editAddress');
                var address = formAddress.address;
                var contact = formAddress.contact;
                var deletionContact = clone(formAddress.contact);

                // Deleted
                if (contact.status == 'DELETED') {
                    delete(vm.contacts[deletionContact.personID]);
                    return;
                } else {
                    contact.firstName = formAddress.recipientName;
                    contact.addresses[0] = address;

                    if(address.addressType === 1) {
                        accountDataService.setHomeAddress(contact).then(function() {
                            userDetails.setHomeAddress(contact);
                        });
                    } else {
                        contactsDataService.updateContact(contact);
                    }
                    
                }

            });

            $state.go('top.contacts.addForm');

        }
    }

})();