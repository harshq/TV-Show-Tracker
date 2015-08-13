angular.module('MyApp')
	.controller('requestCtrl', function(Request, alertService){

var vm = this;
	
	vm.title = "Request a show";
	vm.loading = false;
	
	
	vm.search = function(showName){
		
		vm.loading = true;
		var show = Request.get({showName: showName});
		show.$promise.then(function(data){
		
			if(data.status !== 404){
				vm.title = "Is this what you are looking for ?!";
				vm.show = data;
				vm.loading = false;
				//console.log('IF : '+data);
				//console.log(data);
			}else{
				alertService.alert('Sorry! ','Couldnt find anything related to that ','danger');
				vm.loading = false;
				//console.log('ELSE : '+data);
				//vm.title = "Sorry! Couldn't find anything related to that!";
			}

		
		}, function(err){
			//console.log('ERR : '+err);
			vm.title = "Sorry! Couldn't find anything related to that!";
			vm.loading = false;
		});
		
	
	};
	
	vm.select = function(userId){
		//console.log(userId);
		vm.show.userId = userId;
		Request.save(vm.show);
		alertService.alert('Cheers! ','You will recieve an email if we managed to add it!','success');
		vm.show = null;
		vm.searchText = "";
	
	};
	
	vm.cancel = function(){
		vm.show = null;
		vm.title = "Request a show";
		vm.searchText = "";
	
	};
	
	
	

});