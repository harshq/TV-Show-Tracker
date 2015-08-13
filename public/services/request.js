angular.module('MyApp')
  .factory('Request', ['$resource', function($resource) {
	  
    return $resource('/info/:showName',{showName: "@showName"});
	  
  }]);