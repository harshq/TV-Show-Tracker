angular.module('MyApp')
	.service('alertService', function($alert){
    
    this.alert = function(title, content, type){
        
        $alert({
            title: title,
            content: content,
            placement: 'floater top right am-flip-x',//CHANGE THIS TO THE CLASS YOU WANT
            duration: '3',
            type: type,
            show: true
            });
    };
});