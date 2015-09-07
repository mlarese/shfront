angular.module('app')
.directive('ngWidget', function($log,$rootScope,$commangular,ConfigurationService) {
    var tempaltesVersion='1.0.1';
    return {
        restrict: 'EA',
        replace: false,
        scope: {
            ngName: '@',
            ngModel:'='
        },
        controller:function($scope,$timeout,$log){
            jndi.$scopes.widgets[$scope.ngName]=$scope;

            $log.info('ngWidget.'+$scope.ngName);
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

                    if(widget && widget.structure && widget.structure.config && widget.structure.config.events  && widget.structure.config.events.reload){
                        var events=widget.structure.config.events.reload;
                        for(var i=0;i<events.length;i++) {
                            $log.info(events[i]);
                            $rootScope.$on(events[i], reloadWidget);
                        }
                    }
                };

            if(!$scope.dispatch)
                $scope.dispatch=$commangular.dispatch;

            $scope.dispatch( CHAIN_COM_WIDGETS_SHOW ,dispatchParameters)
                .then(function(response){

                    var widget = response.widget,
                        optionsName='',
                        options={},
                        values={};

                    if(response.chartConfig){
                        options = response.chartConfig;
                        optionsName = widget.graphic.options;
                    }
                    if(widget){
                        var widgetStructure ={id:widget.code,type:widget.type,options:options,optionsName:optionsName};
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
        template:'<div  ng-include="template" ng-model="model"  />' ,
        link: function(scope, iElement, iAttrs) { }
    };
})