// config

angular.module('app')
  .config(function ($httpProvider) {
        //$httpProvider.defaults.withCredentials = true;
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
  })
  .config(function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  )
  .config(  function($translateProvider  ,tmhDynamicLocaleProvider){
            $translateProvider.useStaticFilesLoader({
              prefix: 'l10n/',
              suffix: '.json'
            });
            $translateProvider.preferredLanguage('it');
            $translateProvider.useLocalStorage();
            tmhDynamicLocaleProvider.localeLocationPattern('../libs/angular/i18n/angular-locale_{{locale}}.js');

  })
  .run(['$http', '$cookies', function($rootScope,$http, $cookies) {
        var result = '',length=32, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        //$http.defaults.useXDomain = true;
        $rootScope.__sessionId = result;
  }])
  .run(function( tmhDynamicLocale){
        tmhDynamicLocale.set('it');
  })
  .run(function( $rootScope ,$log,$timeout){
        var today=new Date(),
            curYear=today.getFullYear(),
            year3Ago=curYear-2;

        $rootScope.dateFilterDefinitions= {
            expanded:false,
                items: [
                 {id: 'fltbyopendate', title: 'Open Date', type: 'open'}
                ,{id: 'fltbycheckindate', title: 'Checkin Date', type: 'checkin'}
                ,{id: 'fltbycheckoutdate', title: 'Checkout Date', type: 'checkout'}
            ]
        };

        $rootScope.months =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $rootScope.dashBoardFilter={
            structure: null
            ,checkinYearFrom: year3Ago
            ,checkinYearTo: curYear
            ,checkoutYearFrom: year3Ago
            ,checkoutYearTo: curYear
            ,openYearFrom: year3Ago
            ,openYearTo: curYear

            ,checkinMonthFrom: 1
            ,checkinMonthTo: 12
            ,checkoutMonthFrom: 1
            ,checkoutMonthTo: 12
            ,openMonthFrom: 1
            ,openMonthTo: 12

            ,checkinDateFrom: year3Ago + '-01-01'
            ,checkinDateTo: curYear + '-12-31'
            ,checkoutDateFrom: year3Ago + '-01-01'
            ,checkoutDateTo: curYear + '-12-31'
            ,openDateFrom: year3Ago + '-01-01'
            ,openDateTo: curYear + '-12-31'
        };

        var filterHandler=null;
        $rootScope.$watch('currentStructure', function(structureObj, oldStructureObj) {
            $log.info("$rootScope.emit.filter.current.structure.changed");
            $rootScope.$emit('filter.current.structure.changed',structureObj);
        });

        $rootScope.$watchCollection('dashBoardFilter', function(newValue, oldValue) {
            if(filterHandler) $timeout.cancel(filterHandler);
            filterHandler= $timeout( function(){
                $log.info("$rootScope.emit.filter.basic.changed");
                $rootScope.$emit('filter.basic.changed',$rootScope.dashBoardFilter);
            } ,400)

        });

        $rootScope.$on('filter.current.structure.changed',function(event,structureObj){
            $log.info("$rootScope.on.filter.current.structure.changed");
            $rootScope.dashBoardFilter.structure=structureObj;
        });

  });
