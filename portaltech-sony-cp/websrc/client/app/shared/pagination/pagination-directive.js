angular.module('sharedPaginator').directive('sharedPaginator', function sharedPaginator () {
	return {
		restrict: 'E',
		templateUrl : 'app/shared/pagination/pagination.html',
		scope : {
			options :'='
		},
		controllerAs: "sharedPaginatorController",
		controller: function($scope){
			var vm = this;			
			vm.options = $scope.options;
			
			$scope.$watch('options', function(data) {
				vm.totalPage = Math.ceil(data.totalItems / data.limit);
			}, true);

			this.nextPrev = function(value) {
				if((value && vm.options.pageOffset < vm.totalPage) ||  (!value && vm.options.pageOffset > 1)) {
					(value) ? vm.options.pageOffset++ : vm.options.pageOffset--;

					this.onChangePage();
				}
			};

			this.onChangeLimit = function() {
				vm.options.pageOffset = 1;
				this.onChangePage();
			};

			this.onChangePage = function() {
				vm.options.onChangePage();
			}

		},

		link: function (scope, iElement, iAttrs) {
			
		}
	};
});