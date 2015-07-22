angular.module('app')
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