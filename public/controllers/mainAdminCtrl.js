angular.module('MyApp')
	.controller( 'mainAdminCtrl' ,function(User,Request){

	var vm = this;
	

  vm.labelsLine = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satarday", "Sunday"];
  vm.seriesLine = ['New Users'];
  vm.dataLine = [
    [2, 0, 1, 0, 0, 1, 2]
  ];
  
	
 vm.labelsDau = [];
 vm.dataDau = [];
	
	
User.allUsers().query().$promise.then(
	function(users){
		vm.users = users
		
		var StripedUsers = vm.users.map(function(element){
			return {email: element.email , created: new Date(element.createdOn).setHours(0,0,0,0) , fullDate:element.createdOn }
		});
		
		console.log(StripedUsers);
		
		
		
		
		
		
		
		
	}, function(err){
		console.log(err)
	});
	
	

Request.query().$promise
	.then(
	function(data){
		data.forEach(function(element,index,array){
			vm.labelsDau.push(element.name);
			vm.dataDau.push(element.reqested.length);
		});
	}, function(err){
		console.log(err)
});
	

	
	
});