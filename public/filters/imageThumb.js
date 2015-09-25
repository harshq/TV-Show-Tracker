angular.module('MyApp')
.filter('thumbnail', function(){
	return function(val){


	if(val){
		return val.replace('original','thumb');
	}else{
		return val;
	}

		
	


	}
});