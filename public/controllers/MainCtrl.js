angular.module('MyApp')
  .controller('MainCtrl', ['Show', 'Detail','Subscription','alertService', function(Show, Detail,Subscription,alertService) {
	  var vm = this;

    vm.genres = ['Action', 'Adventure', 'Animation', 'Children', 'Comedy',
      'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Food',
      'Home and Garden', 'Horror', 'Mini-Series', 'Mystery', 'News', 'Reality',
      'Romance', 'Sci-Fi', 'Sport', 'Suspense', 'Talk Show', 'Thriller',
      'Travel','Political','Science', 'Biography','Musicals','Fiction'];

    vm.headingTitle = 'Top TV Shows';

    vm.shows = Show.query();
	
	 vm.reset = function(){
	 	 vm.shows = Show.query();
		 vm.headingTitle = 'Top TV Shows';
	 };

    vm.filterByGenre = function(genre) {
      vm.shows = Show.query({ genre: genre });
      vm.headingTitle = genre;
    };
	
	vm.selectShow = function(selectedShow){
		Detail.selectedShow = selectedShow;
	};
	  
	vm.subscribe = function(showId,showName , userId , subscribedShows){
		
		var promise = Subscription.add({userId: userId, showId: showId});
		promise.then(function(){alertService.alert("Cheers!"," You will now get updates of '"+showName+"'!","success");}
					 ,function(){alertService.alert('Oh man!',' Something went wrong. Try again maybe ?!','danger');});
		
		//var index = subscribedShows.indexOf(showId);
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
	  
	 
  }]);