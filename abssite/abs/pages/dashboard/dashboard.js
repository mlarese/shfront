'use strict';
app .controller('DashboardCtrl', function($scope , $localStorage , $log , facilities , DataSrv,$state  ) {

        var pageName='dashboard',
            curStatus=$state.current,
            pageSection=curStatus.code,
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
                    id: pageSection,
                    section: pageSection,
                    scope: $scope.app.pages.dashboard,
                    attribute: '.'
                })
            })


    }
);