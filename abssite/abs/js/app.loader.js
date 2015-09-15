define([
        'app',
        "constants",
        //"events",
        "commandsconfig",
        "widgetscommands",
        "pagescommands",
        "chartscommands",
        "ServiceMixin",

        "facilities",
        "fromNow",
        "capitalize",
        "setnganimate",
        "ui-butterbar",
        "ui-focus",
        "ui-fullscreen",
        "ui-jq",
        "ui-module",
        "ui-nav",
        "ui-scroll",
        "ui-shift",
        "ui-toggleclass",
        "ui-with",
        "ng-widget",
        "ng-chart",
        //"flo-Tchart",
        "daterangepicker",
        "MenuService"
        /*,
        "ChartConfigService",
        "DataService",
        "PagesService",
        "WidgetsService",
        "ConfigurationService",
        "ui-router-extras"*/
    ],
    function (app) {
        app.run(function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        })
        .config(function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG, APP_CONFIG, PG_CONFIG) {
            var layout = APP_CONFIG.router.appLayout;
            $urlRouterProvider.otherwise(APP_CONFIG.router.startUrl);

            var defineLazyState = function (name, options) {
                var pathName = 'pages/' + name + '/' + name,
                    modules = [];

                options = options || {};
                options.url = "/" + name;
                options.templateUrl = pathName + '.html';

                modules.push(pathName + '.js');


                if (PG_CONFIG[pathName]) {
                    modules = modules.concat(PG_CONFIG[pathName]);
                }
                options.resolve = load(modules);
                return options;
            }

            var states = APP_CONFIG.router.states;

            $stateProvider
                .state('app', {url: '/app', templateUrl: layout, abstract: true})
                .state('access', {url: '/access', template: '<div ui-view class="fade-in-right-big smooth"></div>'})
                .state('access.login', defineLazyState('login'))
            ;

            for (var i = 0; i < states.length; i++) {
                var name = states[i];
                $stateProvider.state('app.' + name, defineLazyState(name))
            }

            function load(srcs, callback) {
                return {
                    deps: ['$ocLazyLoad', '$q',
                        function ($ocLazyLoad, $q) {
                            var deferred = $q.defer(),
                                promise = false;

                            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                            if (!promise) {
                                promise = deferred.promise;
                            }
                            angular.forEach(srcs, function (src) {
                                promise = promise.then(function () {
                                    if (JQ_CONFIG[src]) {
                                        return $ocLazyLoad.load(JQ_CONFIG[src]);
                                    } else if (PG_CONFIG[src]) {
                                        return $ocLazyLoad.load(PG_CONFIG[src]);
                                    }
                                    var name = src;
                                    angular.forEach(MODULE_CONFIG, function (module) {
                                        if (module.name == src)
                                            name = module.name;

                                    });
                                    return $ocLazyLoad.load(name);
                                });
                            });
                            deferred.resolve();
                            return callback ? promise.then(function () {
                                return callback();
                            }) : promise;
                        }]
                }
            }
        })
        .constant('ENDPOINT_URI', window.jndi.resource.ENDPOINT_URI)

        .constant('JSON_FILES_VERSION', "1.0.2")
        .config(function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
            app.controller = $controllerProvider.register;
            app.directive  = $compileProvider.directive;
            app.filter     = $filterProvider.register;
            app.factory    = $provide.factory;
            app.service    = $provide.service;
            app.constant   = $provide.constant;
            app.value      = $provide.value;
        })
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
        .constant('APP_CONFIG',window.jndi)
        .constant('WIDGET_CONFIG',{
            widgetSize: {xsmall:3,small:4,medium:6,large:8,xlarge:9,full:12},
            widgetHeight: {x1:270,x2:270*2,x3:270*3}
        })
        .constant('PG_CONFIG',_PG_CONFIG_)
        .constant('JQ_CONFIG',_JQ_CONFIG_)
        .constant('MODULE_CONFIG', [
            {
                name: 'ngGrid',
                files: [
                    '../libs/angular/ng-grid/build/ng-grid.min.js',
                    '../libs/angular/ng-grid/ng-grid.min.css',
                    '../libs/angular/ng-grid/ng-grid.bootstrap.css'
                ]
            },
            {
                name: 'ui.grid',
                files: [
                    '../libs/angular/angular-ui-grid/ui-grid.min.js',
                    '../libs/angular/angular-ui-grid/ui-grid.min.css',
                    '../libs/angular/angular-ui-grid/ui-grid.bootstrap.css'
                ]
            },
            {
                name: 'ui.select',
                files: [
                    '../libs/angular/angular-ui-select/dist/select.min.js',
                    '../libs/angular/angular-ui-select/dist/select.min.css'
                ]
            },
            {
                name:'angularFileUpload',
                files: [
                    '../libs/angular/angular-file-upload/angular-file-upload.js'
                ]
            },
            {
                name:'ui.calendar',
                files: ['../libs/angular/angular-ui-calendar/src/calendar.js']
            },
            {
                name: 'ngImgCrop',
                files: [
                    '../libs/angular/ngImgCrop/compile/minified/ng-img-crop.js',
                    '../libs/angular/ngImgCrop/compile/minified/ng-img-crop.css'
                ]
            },
            {
                name: 'angularBootstrapNavTree',
                files: [
                    '../libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                    '../libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css'
                ]
            },
            {
                name: 'toaster',
                files: [
                    '../libs/angular/angularjs-toaster/toaster.js',
                    '../libs/angular/angularjs-toaster/toaster.css'
                ]
            },
            {
                name: 'textAngular',
                files: [
                    '../libs/angular/textAngular/dist/textAngular-sanitize.min.js',
                    '../libs/angular/textAngular/dist/textAngular.min.js'
                ]
            },
            {
                name: 'vr.directives.slider',
                files: [
                    '../libs/angular/venturocket-angular-slider/build/angular-slider.min.js',
                    '../libs/angular/venturocket-angular-slider/build/angular-slider.css'
                ]
            },
            {
                name: 'com.2fdevs.videogular',
                files: [
                    '../libs/angular/videogular/videogular.min.js'
                ]
            },
            {
                name: 'com.2fdevs.videogular.plugins.controls',
                files: [
                    '../libs/angular/videogular-controls/controls.min.js'
                ]
            },
            {
                name: 'com.2fdevs.videogular.plugins.buffering',
                files: [
                    '../libs/angular/videogular-buffering/buffering.min.js'
                ]
            },
            {
                name: 'com.2fdevs.videogular.plugins.overlayplay',
                files: [
                    '../libs/angular/videogular-overlay-play/overlay-play.min.js'
                ]
            },
            {
                name: 'com.2fdevs.videogular.plugins.poster',
                files: [
                    '../libs/angular/videogular-poster/poster.min.js'
                ]
            },
            {
                name: 'com.2fdevs.videogular.plugins.imaads',
                files: [
                    '../libs/angular/videogular-ima-ads/ima-ads.min.js'
                ]
            },
            {
                name: 'xeditable',
                files: [
                    '../libs/angular/angular-xeditable/dist/js/xeditable.min.js',
                    '../libs/angular/angular-xeditable/dist/css/xeditable.css'
                ]
            },
            {
                name: 'smart-table',
                files: [
                    '../libs/angular/angular-smart-table/dist/smart-table.min.js'
                ]
            },
            {
                name: 'angular-skycons',
                files: [
                    '../libs/angular/angular-skycons/angular-skycons.js'
                ]
            }
        ])
        .config(function($ocLazyLoadProvider, MODULE_CONFIG) {
            // We configure ocLazyLoad to use the lib script.js as the async loader
            $ocLazyLoadProvider.config({
                debug:  false,
                events: true,
                modules: MODULE_CONFIG
            });
        })
        ;

    }
);
