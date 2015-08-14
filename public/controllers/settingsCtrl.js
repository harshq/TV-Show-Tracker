angular.module('MyApp')
.controller('settingsCtrl', function(User){
	var vm = this;
	vm.edit = false;
	vm.memberSince = User.loggedUser.createdOn;
	vm.imageStrings = [];
	
	 vm.processFiles = function(files){
     angular.forEach(files, function(flowFile, i){
       var fileReader = new FileReader();
          fileReader.onload = function (event) {
            var uri = event.target.result;
              vm.imageStrings[i] = uri;     
          };
          fileReader.readAsDataURL(flowFile.file);
		});
	  };
	
	vm.isEditable = function(user){
		vm.homeUser = user;
		vm.user = JSON.parse(JSON.stringify(user));
		vm.edit = true;
	};
	
	vm.cancel = function(){
		vm.edit = false;
	};
	
	vm.save = function(){
		vm.user.image = vm.imageStrings[vm.imageStrings.length - 1];
		var changed = User.currentUser(vm.user);
		for(i in vm.user){
			vm.homeUser[i] = vm.user[i];
		}
		console.log(vm.user);
		vm.edit = false;
	};
	
	vm.removeGenre = function(genre){
		
		var index = vm.user.genre.indexOf(genre);
		vm.user.genre.splice(index, 1);
		console.log(vm.user.genre);
	};
	
	vm.addGenre = function(newGenre){
		vm.user.genre.push(newGenre);
		vm.newGenre = "";
	};
	
});