angular.module('hitsService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Hits', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/hits');
			}
		}
	}]);