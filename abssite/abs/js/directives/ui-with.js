angular.module('app')
.directive('ngWith', function($rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            model: '=',
            template: '@'
        },
        template: '<div data-ng-include="template"></div>',
        link: function(scope, iElement, iAttrs) {

        }
    };
})
.directive('ngRowtitle', function($rootScope,ConfigurationService) {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            ngTitle: '@'
        },
        templateUrl: function( elem,attrs) {
            var tplName=attrs.name;
            return ConfigurationService.getWidgetTemplateName('rowtitle','1.1.0')
        },
        controller:function($scope){
            $scope.title=$scope.ngTitle;
        },
        link: function(scope, iElement, iAttrs) {  }
    };
});