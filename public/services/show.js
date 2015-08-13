angular.module('MyApp')
  .factory('Show', ['$resource', function($resource) {
	  
    return $resource('/shows/:showId',{showId: "@showId"});
	  
  }]);