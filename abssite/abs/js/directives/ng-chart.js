angular.module('app')
    .directive('ng_Chart_', function($log,$rootScope,$commangular,DataServiceTransform) {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                chartName: '@',
                chartType: '@',
                chartValues: '=',
                chartOptions:'@'
            },

            controller:function($scope,$timeout){
                var dataPivot = DataServiceTransform.chartTransformer($scope.chartValues,$scope.chartType) ;

                if( angular.isString($scope.chartOptions))
                    $scope.chartOptions= angular.fromJson($scope.chartOptions);

                $scope.chartOptions.bars={};
                $scope.chartOptions.legend={show:true};
                $scope.chartOptions.xaxis.ticks=dataPivot.labels;

                $scope.chartOptionsObj=$scope.chartOptions;

                $scope.chartData= dataPivot.data;
            },
            template:'<div ng-if="chartData" ui-jq="plot" ui-options="{{chartData}},{{chartOptionsObj}}"  style="height:240px" />' ,
            link: function(scope, iElement, iAttrs) { }
        };
    })

    .directive('ngChart', function($log,DataServiceTransform){
        return{
            restrict: 'EA',
            scope: {
                chartValues: '=',
                chartType: '@',
                chartOptions: '@'
            },
            replace: true,
            link: function(scope, elem, attrs){
                var chart = null,
                    options  ;

                if( angular.isString(scope.chartOptions))
                    scope.chartOptions= angular.fromJson(scope.chartOptions);

                scope.chartOptions.bars={};
                scope.chartOptions.legend={show:true};

                options = scope.chartOptions||{};

                options.legend={
                        show:false
                    };

                scope.$watchCollection('chartValues', function(v){
                    v=v||[];
                    if(!v.label) return;

                    if(!chart){
                        options.xaxis.ticks=v.labels;
                        chart = window.$.plot(elem, v.data , options);
                        elem.show();
                    }else{

                        options.xaxis.ticks=v.labels;
                        chart = window.$.plot(elem, v.data , options);
                        elem.show();

                        /*chart.getAxes().xaxis.ticks  = v.labels;
                        chart.setData(v.data);
                        chart.setupGrid();
                        chart.draw();*/
                    }
                });

                scope.$watchCollection(attrs.chartValues, function(v){


                });
            }
        };
    });