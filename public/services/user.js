angular.module('MyApp')
 	.service('User', function($resource, alertService,$q,$http){
	this.loggedUser = {};
	
	this.currentUser = function(obj){
		//var user = $resource('/users/:_id',{id:obj._id},{update: {method:'POST', params:obj }});
				var deferred = $q.defer();
				
				$http.post('/users/'+obj._id, obj)
					.then(function(data,status,headers,config){
						alertService.alert('Done! ',' Your profile has been updated! ','success');
						deferred.resolve(data);
					},function(data,status,headers,config){
						alertService.alert('Oops! ',' Looks like that email is already in use! ','danger');
						deferred.reject(status);
					});
				
				return deferred.promise;
		
	};
	
	this.allUsers = function(){
		
		return $resource ('/users');
	}
	
});