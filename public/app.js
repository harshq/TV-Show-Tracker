var app = angular.module('MyApp', ['mgcrea.ngStrap','ngAnimate','ngCookies', 'ngResource', 'ngMessages', 'ngRoute','ui.calendar','flow','chart.js']);

app.config(['$routeProvider','$locationProvider','$compileProvider', function($routeProvider,$locationProvider,$compileProvider){

	$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|magnet):/);
	
    $locationProvider.html5Mode(true);

	$routeProvider
	  .when('/', {
	    templateUrl: 'views/mainUser.html',
	    controller: 'MainCtrl',
		controllerAs: 'main'
	  })
	  .when('/request', {
	    templateUrl: 'views/request.html',
	    controller: 'requestCtrl',
		controllerAs: 'request'
	  })
	  .when('/calender', {
	    templateUrl: 'views/calender.html',
	    controller: 'calenderCtrl',
		controllerAs: 'cal'
	  })
	  .when('/settings', {
	    templateUrl: 'views/settings.html',
	    controller: 'settingsCtrl',
		controllerAs: 'settings'
	  })
	  .when('/details', {
	    templateUrl: 'views/details.html',
	    controller: 'detailsCtrl',
		controllerAs: 'detailCtrl'
	  })
	.when('/mainAdmin', {
	    templateUrl: 'views/mainAdmin.html',
	    controller: 'mainAdminCtrl',
		controllerAs: 'AdminCtrl'
	  })
	.when('/addShow', {
	    templateUrl: 'views/addShow.html',
	    controller: 'addShowCtrl',
		controllerAs: 'addShowCtrl'
	  })
	  .otherwise({
	    redirectTo: '/'
	  });
  
}]);


app.controller('homeController', function(Login, $window, $location,$rootScope,alertService,User){
	var vm = this;
	vm.isLoading = false;
	vm.user = {}; 
	
	
		
	vm.signIn = function(){
		
		var promise = Login.validate({email: vm.email , password: vm.password });
		promise.then(function(data){
			
						vm.user = data.data[0];
			
						if(vm.user){
								User.loggedUser = vm.user;
								alertService.alert('Hello '+vm.user.firstName+'!',' Good to see you again!','success');
							
							
								if(vm.user.userType === 'admin'){
									 $location.path('/mainAdmin');
								}
							
						}else{
								alertService.alert('Oops!',' Check your email and password again!','danger');
						}
						
						}
					 ,function(err){
						alertService.alert('Oh boy!',' Something went wrong in the database!','danger');
						//console.log(err)
					 });

	};

	
	vm.logged = function(){
		if(vm.user){
			if(vm.user._id){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	};
	
	
	vm.isActive = function(viewLocation){
		return viewLocation === $location.path();
	};
	
	vm.logout = function(){
		$window.location = $window.location.origin + '/';
	};
	
	
	
	vm.header = "Header";
	vm.description = "description";
	
	
	
	
});


















