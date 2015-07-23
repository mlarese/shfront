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
  });
