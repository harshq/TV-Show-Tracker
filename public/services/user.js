angular.module('MyApp')
 	.service('User', function($resource, alertService){
	this.loggedUser = {};
	
	this.currentUser = function(obj){
		var user = $resource('/users/:_id',{id:obj._id},{update: {method:'POST', params:obj }});
		user.update(obj).$promise.then(function(){
			alertService.alert('Done! ',' Your profile has been updated! ','success');
		}, function(){
			alertService.alert('Oops! ',' Looks like that email is already in use! ','danger');
		});
	};
	
});