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
.directive('ngChart', function($log,$rootScope,ConfigurationService,WidgetSrv,ChartConfigSrv) {
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            chartName: '@',
            chartType: '@'

        },
        controller:function($scope,$timeout){
            WidgetSrv
                .assignToScope($scope.chartName,$scope,'widget')
                .then(function(res){
                    //console.dir(res)
                })

            return


            WidgetSrv.query().$promise
                .then(function(widgetStorage){
                    $scope.widget =  widgetStorage[$scope.chartName];
                    return ChartConfigSrv.query().$promise;
                })
                .then(function(chartsConfigStorage){
                    var optionsObj = angular.fromJson(chartsConfigStorage[$scope.chartType]);
                    $scope.chartOptions =  optionsObj;
                    return WidgetDataSrv.query().$promise ;
                })

                .then(function(widgetDataStorage){
                    var widgetData=angular.fromJson(widgetDataStorage);
                    $scope.chartData =  widgetData;
                })
        },
        template:'<div ng-if="chartData" ui-jq="plot" ui-options="{{chartData}},{{chartOptions}}"  style="height:240px" />' ,
        link: function(scope, iElement, iAttrs) { }
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