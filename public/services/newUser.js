angular.module('RegisterApp')
	.factory('newUser', [ '$resource', function ($resource) {
		 return $resource('/users');
	}]);