angular.module('MyApp')
  .factory('Subscription', ['$resource','$q','$http', function($resource, $q, $http) {
	  
   return {
	  		add : function(obj){
				var deferred = $q.defer();
				
				$http.post('/subscribe',obj)
					.then(function(data,status,headers,config){
						deferred.resolve(data);
					},function(data,status,headers,config){
						deferred.reject(status);
					});
				
				return deferred.promise;
			},
	   
	   		remove : function(obj){
				var deferred = $q.defer();
				
				$http.post('/unsubscribe',obj)
					.then(function(data,status,headers,config){
						deferred.resolve(data);
					},function(data,status,headers,config){
						deferred.reject(status);
					});
				
				return deferred.promise;
			}
	  };
	  
	  
  }]);