angular.module('MyApp')
.directive('ngLinkFix', function () {
    return function (scope, element, attrs) {
       element.on('error', function(e){
       		attrs.$set('src', attrs.ngLinkFix );
       });
    };
});

