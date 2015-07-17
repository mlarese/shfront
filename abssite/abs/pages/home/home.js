'use strict';
app.controller('HomeCtrl',
    [           '$scope','$localStorage','$log','facilities',
        function($scope , $localStorage , $log,  facilities) {
            var pageName='home',
                dispatchMsg={
                    scope:$scope,
                    pageConfig:{
                        pagePath:'app.pages',
                        pageName:pageName,
                        initConfig:{}
                    }
                }  ;
            $scope.dispatch('pages.register',dispatchMsg);
        }
    ])
;