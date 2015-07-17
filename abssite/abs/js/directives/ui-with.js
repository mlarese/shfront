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
.directive('ngWidget', function($log,$rootScope,$commangular,ConfigurationService) {
    var tempaltesVersion='1.0.1';
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            ngName: '@'
        },
        controller:function($scope,$timeout){
            var dispatchParameters={widgetId:$scope.ngName},
                reloadWidgetById=function(id){
                    if(id!=$scope.ngName) return;
                    $scope
                        .dispatch(COM_WIDGETS_LOAD_DATA,{widgetId:id})
                        .then(assignWidgetValues)
                },
                reloadWidget=function(){
                    $scope
                        .dispatch(COM_WIDGETS_LOAD_DATA,{widgetId:$scope.ngName})
                        .then(assignWidgetValues)
                },
                assignWidgetValues=function(dispatchedMessage){
                    var values={};
                    if(dispatchedMessage.widgetData)
                        values=dispatchedMessage.widgetData ;
                    if(!$scope.model) $scope.model={};
                    $scope.model.values = values;
                },
                assignWidgetData=function(data){
                    if(!$scope.model) $scope.model={};
                    $scope.model.data = data;
                },
                assignWidgetTemplate=function(templateType){
                    $scope.template = ConfigurationService.getWidgetTemplateName(templateType,tempaltesVersion)
                },
                assignWidgetEvents=function(widget){
                    $rootScope.$on( EV_WIDGETS_RELOAD_ALL,reloadWidget);
                    $rootScope.$on(EV_WIDGETS_RELOAD,reloadWidgetById);
                    if(widget && widget.config && widget.config.events  && widget.config.events.reload){
                        var events=widget.config.events.reload;

                        for(var i=0;i<events.length;i++)
                            $rootScope.$on(events[i],reloadWidget);
                    }
                };

            if(!$scope.dispatch)
                $scope.dispatch=$commangular.dispatch;

            $scope.dispatch( CHAIN_COM_WIDGETS_SHOW ,dispatchParameters)
                .then(function(response){
                    var widget = response.widget,
                        values={};

                    if(widget){
                        var widgetStructure ={id:widget.code,type:widget.type};
                        angular.extend(widgetStructure,widget.structure);
                        assignWidgetValues(response);
                        assignWidgetData(widgetStructure);
                        assignWidgetTemplate(widget.type);
                        assignWidgetEvents(widget);
                    }else{
                        assignWidgetTemplate(response.widgetId);
                    }
                })

        },
        template:'<div  ng-include="template" model="model"  />' ,
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