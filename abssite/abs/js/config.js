// config

var app =  angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(
        [       '$translateProvider','tmhDynamicLocaleProvider' ,
        function($translateProvider  ,tmhDynamicLocaleProvider){
            $translateProvider.useStaticFilesLoader({
              prefix: 'l10n/',
              suffix: '.json'
            });
            $translateProvider.preferredLanguage('it');
            $translateProvider.useLocalStorage();
            tmhDynamicLocaleProvider.localeLocationPattern('../libs/angular/i18n/angular-locale_{{locale}}.js');

  }])
  .run(
        [        'tmhDynamicLocale',
        function( tmhDynamicLocale){
            tmhDynamicLocale.set('it');
  }]);
