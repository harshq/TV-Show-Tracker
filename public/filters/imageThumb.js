angular.module('MyApp')
.filter('thumbnail', function(){
	return function(val){
		return val.replace('original','thumb');
	}
});