'use strict';
app .controller('QuickreportCtrl',
   function( $scope  , $log   ) {
            var tplVersion='1.0.1',
                pageName='quickreport',

                dispatchMsg={
                    scope:$scope,
                    pageConfig:{
                        pagePath:'app.pages',
                        pageName:pageName,
                        initConfig:{ tplVersion:tplVersion,  title:'Quick report'}
                    }
                }  ;

                $scope.dispatch(COM_PAGES_REGISTER,dispatchMsg);

        }
    )
;