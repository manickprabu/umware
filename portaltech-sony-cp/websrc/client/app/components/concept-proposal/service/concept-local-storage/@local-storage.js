angular.module('conceptProposal').service('conceptLocalStorage', conceptLocalStorage);
function conceptLocalStorage($window) {
	 /// storage nane constants
	 var storageName = 'conceptLocalDraft';	 
	 // -- Generic Services
	 function set(key,value) {
	 	console.log('******* conceptLocalStorage ******* Function has not been used.');
	 	$window.localStorage.setItem(key,value);	
	 };

	 function get(key) {
	 	console.log('******* conceptLocalStorage ******* Function has not been used.');
	 	return $window.localStorage.getItem(key);
	 };

	 function remove(key) {
	   $window.localStorage.removeItem(key);
	 };

	 //// Spacific Services
	 // Information Local Storage

	 this.setDraftStorage = function(value) {
	 	 set(storageName, JSON.stringify(value));
	 };

	 this.getDraftStorage = function() {
	 	return JSON.parse(get(storageName));
	 };

	 this.deleteDraftStorage = function() {
	 	return remove(storageName);
	 };	
};