//angular.module('MyApp')
//  .factory('Login', ['$resource', function($resource) {
//
//	return $resource("http://localhost:3000/users/loginValidate",{ }, { validate: {method:'POST', isArray:true} });
//			
//		  }
//  }]);


angular.module('MyApp')
  .factory('Login', ['$http','$q', function($http, $q) {
	  
	  return {
	  		validate : function(obj){
				var deferred = $q.defer();
				
				$http.post('/users/loginValidate',obj)
					.then(function(data,status,headers,config){
						deferred.resolve(data);
					},function(data,status,headers,config){
						deferred.reject(status);
					});
				
				return deferred.promise;
			}
	  };
	
	
	
  }]);