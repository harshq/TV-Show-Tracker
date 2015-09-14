angular.module('MyApp')
  .factory('NewShow', ['$resource', function($resource) {
	  
    return $resource('/add/:tvdbId',{tvdbId: "@tvdbId"});
	  
  }]);