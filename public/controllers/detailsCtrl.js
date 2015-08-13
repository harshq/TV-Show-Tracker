angular.module('MyApp')
	.controller('detailsCtrl',['Detail','$filter','$scope','Subscription','alertService', function(Detail,$filter,$scope,Subscription,alertService){
	
	var vm = this;
	vm.selectedShow = Detail.selectedShow;
	
	vm.stars = function(num){
		var full = Math.floor(num);
        var half = Math.round(num) - full;
        
        var fullStars = function(){
            return new Array(full); 
        };
        var halfStars = function(){
            return new Array(half); 
        };
        
        return { fullStars:fullStars, halfStars:halfStars }
	};
		
	vm.seasonCount = function(){
		var unique = {};
		var distinct = [];
    	for( var i in vm.selectedShow.episodes ){
     		if( typeof(unique[vm.selectedShow.episodes[i].season]) == "undefined"){
      			distinct.push(vm.selectedShow.episodes[i].season);
     		}
     		unique[vm.selectedShow.episodes[i].season] = 0;
    	}
		
		return distinct;
	};
	
	vm.subscribe = function(showId,showName , userId , subscribedShows){
		var promise = Subscription.add({userId: userId, showId: showId});
		
		promise.then(function(){alertService.alert("Cheers!"," You will now get updates of '"+showName+"'!","success");}
					 ,function(){alertService.alert('Oh man!',' Something went wrong. Try again maybe ?!','danger');});
		
		
		subscribedShows.push(showId);
		
		
		
	};
		
	vm.unsubscribe = function(showId,showName , userId , subscribedShows){
		var promise = Subscription.remove({userId: userId, showId: showId});
		
		promise.then(function(){alertService.alert("Done!"," You will no longer get updates of '"+showName+"'!","danger");}
					 ,function(){alertService.alert('Oh man!',' Something went wrong. Try again maybe ?!','danger');});
		
		var index = subscribedShows.indexOf(showId);
		subscribedShows.splice(index, 1);
		
		
		
	};
		
		
	vm.isSubscribed = function(showId , subscribedShows){
		var index = subscribedShows.indexOf(showId);
		
			if(index > -1){
				return true;
			}else{
				return false;
			}
		
	};	
		

		
//	vm.selectSeason = function(SeNo){
//		vm.selectedSeason = SeNo;
//	};			
		
}]);