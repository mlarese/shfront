'use strict';
app
    .controller('HomeCtrl', function($scope , $localStorage , $log,  facilities,$state) {

            var pageName='home',
                dispatchMsg={
                    scope:$scope,
                    pageConfig:{
                        pagePath:'app.pages',
                        pageName:pageName,
                        initConfig:{}
                    }
                }  ;
            //$scope.dispatch('pages.register',dispatchMsg);


        var pageName='home',
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
                $log.info("loading page "+ pageSection);
                $scope.dispatch(COM_PAGES_ASSIGN_TO_SCOPE, { 
                    id: pageSection,
                    section: pageSection,
                    scope: $scope.app.pages.home,
                    attribute: '.'
                })
            })



        }
    )
;