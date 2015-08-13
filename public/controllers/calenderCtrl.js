angular.module('MyApp')
	.controller('calenderCtrl', function(Events){

	var vm = this;
	
	vm.events =[];
	vm.selectedId = "";
	
	var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var currentView = "month";
	
	Events.query()
		.$promise.then(function(data){ 
				data.forEach(function(element,index,array){
					vm.events.push(element);
				});					 
		},function(err){console.log(err)});
	
	
	vm.dayClick = function( date, jsEvent, view){
        alert(date);
    };
	
	vm.eventClick = function( date, jsEvent, view){
        //alert(date._id);
		vm.width = "col-md-9";
		vm.isVisible = true;
		vm.selectedId = date._id;
		
		
		
		
		
    };
	
	vm.loading = function(isLoading, view){
      alert("is loading" + isLoading);
    }
	
	
	vm.eventSources = [vm.events];
	
	
	vm.uiConfig = {
          calendar: {
            height: 600,
            editable: true,
            defaultView: 'month',
            yearCellMinH: 60,
			selectable: true,
            header: {
              left: 'prev,next',
              center: 'title',
              right: 'basicWeek, month, today'
            },
			 dayClick: vm.dayClick,
        	 eventClick: vm.eventClick
          }
        };
     
	
   vm.width = "col-md-12";
   vm.isVisible = false;
	
   vm.toggle = function(){
	   vm.isVisible = !vm.isVisible;
	   
           if(vm.width === "col-md-12"){
			   vm.width = "col-md-9";
		   }else{
		       vm.width = "col-md-12";
		   }
   };

    
	





});