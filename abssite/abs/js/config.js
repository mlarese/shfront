// config

angular.module('app')
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
  .run(function( tmhDynamicLocale){
            tmhDynamicLocale.set('it');

  })
  .run(function( $rootScope ){
        var today=new Date(),
            curYear=today.getFullYear(),
            year3Ago=curYear-2;

        $rootScope.dateFilterDefinitions= {
            expanded:false,
                items: [
                {id: 'fltbyopendate', title: 'Open Date', type: 'open'}
                , {id: 'fltbycheckindate', title: 'Checkin Date', type: 'checkin'}
                , {id: 'fltbycheckoutdate', title: 'Checkout Date', type: 'checkout'}
            ]
        };

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

  });
