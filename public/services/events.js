angular.module('MyApp')
  .factory('Events', ['$resource','User', function($resource, User) {
	  
    return $resource('/users/events/:userId',{userId: User.loggedUser._id});
	  
  }]);