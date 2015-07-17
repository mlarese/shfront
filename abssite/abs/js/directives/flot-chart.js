angular.module('app')
.directive('flChart', function($log){
    return{
        restrict: 'EA',
        scope: {
            ngModel: '=',
            ngOptions: '='
        },
        replace: true,
        link: function(scope, elem, attrs){
            var chart = null,
                options = scope.ngOptions||{};

            scope.$watch('ngModel', function(v){
                v=v||[];
                if(!chart){
                    chart = window.$.plot(elem, v , options);
                    elem.show();
                }else{
                    chart.setData(v);
                    chart.setupGrid();
                    chart.draw();
                }
            });
        }
    };
});