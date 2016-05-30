angular.module('hitsController', [])

	// inject the Hits service factory into our Hits controller controller
	.controller('hitsController', ['$scope','$http','Hits', function($scope, $http, Hits) {

		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get the hits and show them
		Hits.get()
			.success(function(data) {
				$scope.hits = data;
				$scope.loading = false;
			});
	}]);