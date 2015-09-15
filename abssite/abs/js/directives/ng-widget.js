
angular.module('app')
.directive('ngWidget', function($log,$rootScope,$commangular,$ocLazyLoad,$window,JQ_CONFIG,$timeout) {
    var tempaltesVersion='1.0.2',
        DirectiveNgWidget = function($scope){
            jndi.$scopes.widgets[$scope.ngName]=$scope;
            $scope.visibility='';
            $scope.facilities = $rootScope.facilities;
            var getWidgetTemplateName=function(type,version){
                version=version||'1.0.1';
                return 'components/'+ type+'/'+ type+'.html?v='+version;
            },
            dispatchParameters={widgetId:$scope.ngName},
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
            assignController=function(){
                if(!$scope.model ||  !$scope.model.data || !$scope.model.data.plugin) return;

                var path = $scope.model.data.pluginPath+"?v="+tempaltesVersion;
                var plugin = $scope.model.data.plugin;

                $ocLazyLoad.load([path]).then(function(){
                    $window[plugin].init($scope,$rootScope);
                }) ;

            },
            assignWidgetData=function(data){
                if(!$scope.model) $scope.model={};
                $scope.model.data = data;
                assignController();
            },

            assignWidgetTemplate=function(templateType){
                $scope.template = getWidgetTemplateName(templateType,tempaltesVersion)
            },
            assignWidgetEvents=function(widget){
                    $rootScope.$on( EV_WIDGETS_RELOAD_ALL,reloadWidget);
                    $rootScope.$on(EV_WIDGETS_RELOAD,reloadWidgetById);

                    if(widget && widget.structure && widget.structure.config && widget.structure.config.events ){

                        if(widget.structure.config.events.reload) {
                            var events = widget.structure.config.events.reload;
                            for (var i = 0; i < events.length; i++) {
                                $rootScope.$on(events[i], reloadWidget);
                            }
                        }

                        if(widget.structure.config.events["record.selected"]){

                            var listenTo = widget.structure.config.events["record.selected"];
                            var onRecordSelect = function (env, record) {
                                $scope.record = record;
                                //$scope.dispatch(ACTIONS_EVENTS_PARA.EV_WIDGETS_RELOAD)
                            }

                            $rootScope.$on('record.selected.'+ listenTo, onRecordSelect);
                        }

                    }
                };

            if(!$scope.dispatch) $scope.dispatch=$commangular.dispatch;


            $scope.dispatch(  COM_WIDGETS_LOAD ,dispatchParameters)
                .then(function(response){
                    var widget = response.widget,
                        optionsName='',
                        options={},
                        values={};

                    if(widget){
                        var widgetStructure ={id:widget.code,type:widget.type,options:options,optionsName:optionsName};
                        angular.extend(widgetStructure,widget.structure);
                        assignWidgetData(widgetStructure);
                        assignWidgetTemplate(widget.type);
                        assignWidgetEvents(widget);
                    }else{
                        assignWidgetTemplate(response.widgetId);
                    }

                    if(widgetStructure && widgetStructure.autoLoad) {
                        $scope.dispatch(COM_WIDGETS_LOAD_DATA, dispatchParameters).then(function (response) {
                            assignWidgetValues(response)
                        });
                    }
                    $timeout( function(){$scope.visibility=true;},100);
                    return response;
                }) ;

        }

        return {
            restrict: 'EA',
            replace: false,
            scope: {
                ngName: '@',
                ngModel:'='
            },
            controller:DirectiveNgWidget,
            template:'<div  ng-include="template" ng-model="model" ng-class="{hidden:visible}" />'
        };
})