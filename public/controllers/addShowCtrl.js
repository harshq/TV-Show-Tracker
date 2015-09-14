angular.module('MyApp')
	.controller('addShowCtrl',function(Request, alertService , NewShow, Request){

	var vm = this;
	
		
	vm.title = "Add new show";
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
	
	vm.select = function(tvdbId){
		
		NewShow.save({tvdbId : tvdbId})
			.$promise.then(
			function(){
				alertService.alert('Success! ','Show added to the system. ','success');
			},
			function(){
				alertService.alert('Sorry! ','Something went wrong. Show is not added. ','danger');
			}
		);
		
		vm.requestedShows = vm.requestedShows.map(function(element){
			if(element.tvdbId !== tvdbId){
				return element;
			}
		});
		
		vm.show = null;
		vm.searchText = "";
	
	};
	
	vm.cancel = function(){
		vm.show = null;
		vm.title = "Request a show";
		vm.searchText = "";
	
	};
	
	Request.query().$promise
		.then(
		function(data){
			vm.requestedShows = data;
		},function(err){
			console.log(err);
		});
	

});