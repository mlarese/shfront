'use strict';
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [            '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG' ,'APP_CONFIG','PG_CONFIG',
      function (  $stateProvider,   $urlRouterProvider,   JQ_CONFIG,   MODULE_CONFIG  , APP_CONFIG , PG_CONFIG) {
          var layout = APP_CONFIG.router.appLayout ;
          $urlRouterProvider.otherwise(APP_CONFIG.router.startUrl);

          var defineLazyState= function(name,options){
              var pathName='pages/'+name+'/'+name,
                  modules=[];

              options=options||{};
              options.url="/"+name;
              options.templateUrl=pathName+'.html';

              modules.push(pathName+'.js');


              if(PG_CONFIG[pathName]) {
                  modules=modules.concat(PG_CONFIG[pathName]);
              }
              options.resolve=load(modules);
              return options;
          }

          var states = APP_CONFIG.router.states;

          $stateProvider
              .state('app' ,   { url: '/app',       templateUrl: layout ,abstract: true  })
              .state('access', { url: '/access',    template: '<div ui-view class="fade-in-right-big smooth"></div>' })
              .state('access.login', defineLazyState('login'))
          ;

          for(var i=0;i<states.length;i++){
              var name=states[i];
              $stateProvider.state('app.'+name,  defineLazyState(name) )
          }

          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
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
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }
      }
    ]
  );