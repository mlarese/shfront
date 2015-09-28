'use strict';
angular.module('app')
  .run(function ($rootScope,   $state,   $stateParams,$location,$http) {

        var params = $location.search();
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope._authToken = params._tk
  })
  .config( function (  $stateProvider,   $urlRouterProvider,   JQ_CONFIG,   MODULE_CONFIG  , APP_CONFIG , PG_CONFIG) {

          var layout = APP_CONFIG.router.appLayout ;
          $urlRouterProvider.otherwise(APP_CONFIG.router.startUrl);

          var load=function (srcs, callback) {
            return {
                deps:  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer(),
                        promise  = false;

                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                        promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                        promise = promise.then( function(){
                            if(JQ_CONFIG[src]){
                                return $ocLazyLoad.load(JQ_CONFIG[src]);
                            }else if(PG_CONFIG[src]){
                                return $ocLazyLoad.load(PG_CONFIG[src]);
                            }
                            var name = src;
                            angular.forEach(MODULE_CONFIG, function(module) {
                                if( module.name == src)
                                    name = module.name;

                            });
                            return $ocLazyLoad.load(name,{cache: true});
                        } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }
            }
          },
          defineLazyState= function(name,template,load,options){
              var pathName='pages/'+template+'/'+template,
                  modules=[];

              options=options||{};
              options.code = name;
              options.url="/"+name;
              options.templateUrl=pathName+'.html?v=1.0.2';

              modules.push(pathName+'.js');
              if(PG_CONFIG[pathName]) {
                  modules=modules.concat(PG_CONFIG[pathName]);
              }
              options.resolve=load(modules);

              return options;
          },
          states = APP_CONFIG.router.states;

          $stateProvider
              .state('app' ,   { url: '/app',       templateUrl: layout ,abstract: true  })
              .state('access', { url: '/access',    template: '<div ui-view class="fade-in-right-big smooth"></div>' })
              .state('access.login', defineLazyState('login','login',load,{}))
          ;

          jndi.provider.$urlRouterProvider=$urlRouterProvider;
          jndi.provider.$stateProvider=$stateProvider;
          jndi.$fn.loadLazyState=load;
          jndi.$fn.defineLazyState=defineLazyState;

          for(var i=0;i<states.length;i++){
              var name=states[i];
              $stateProvider.state('app.'+name,  jndi.$fn.defineLazyState(name,name,jndi.$fn.loadLazyState) )
          }



      });
