'use strict';
app .controller('DashboardCtrl', function($scope , $localStorage , $log , facilities , DataSrv  ) {
        var pageName='dashboard',
            pageSection='revenue',
            options =  {
                leftColumns:12,
                centerColumns:0,
                rightColumns:0,
                widgets:{},
                tplVersion:'1.0.1'
            },
            dispatchMsg={
                scope:$scope,
                pageConfig:{
                    pagePath:'app.pages',
                    pageName:pageName,
                    pageSection:pageSection,
                    initConfig:options
                }
            }  ;

        $scope.dispatch(COM_PAGES_REGISTER ,dispatchMsg)
            .then(function(afterRegister) {
                $scope.dispatch(COM_PAGES_ASSIGN_TO_SCOPE, {
                    id: 'dashboard_default',
                    section: 'revenue',
                    scope: $scope.app.pages.dashboard,
                    attribute: '.'
                })
            })




    }
);