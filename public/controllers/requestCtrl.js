angular.module('MyApp')
	.controller('requestCtrl', function(Request, alertService, Show, User, Detail){

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
	
	
	function shuffle(array) {
	  var m = array.length, t, i;
	  while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	  }
	  return array;
	}
	
	Show.query().$promise.then(function(shows){
		vm.shuffledShows = shuffle(shows); //array	
	});
	
	vm.selected = function(selectedShow){
		Detail.selectedShow = selectedShow;
	};
	
	var genres = User.loggedUser.genre; //array
	vm.genre =  shuffle(genres)[0];
	
	vm.randomGenre = function(){
		return { 'genre' : vm.genre };
		
	};
	
	
//	console.log(vm.genres);
//	console.log(vm.shuffledShows);
	
	

});