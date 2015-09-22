'use strict';
var AppCtrl = function ( $rootScope,$state, $scope, $translate, $timeout, $localStorage, $window, facilities, $commangular) {
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    isIE && angular.element($window.document.body).addClass('ie');
    isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

    jndi.$fn.$commangular = $commangular;
    jndi.$fn.$state = $state;
    jndi.$fn.$dispatch = $commangular.dispatch;
    jndi.$rootScope = $rootScope;

    // config
    var app = {
        name: 'Abs hub',
        version: '0.0.1',
        // for chart colors
        color: {
            primary: '#7266ba',
            info: '#23b7e5',
            success: '#27c24c',
            warning: '#fad733',
            danger: '#f05050',
            light: '#e8eff0',
            dark: '#3a3f51',
            black: '#1c2b36'
        },
        settings: {
            tplversion: '1,0.1',
            themeID: 1,
            navbarHeaderColor: 'bg-black',
            navbarCollapseColor: 'bg-white-only',
            asideColor: 'bg-black',
            headerFixed: true,
            headerVisible: true,
            asideFixed: false,
            asideFolded: false,
            asideVisible: true,
            asideDock: false,
            container: false
        }
    }

    $localStorage.$reset();
    facilities.init$localStorage($scope, 'app', '.', app);
    facilities.init$localStorage($scope, 'access', 'login', {userName: 'administrator'});

    $scope.$watch('app.settings', function () {
        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
            $scope.app.settings.headerFixed = true;
        }
        $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');

        if ($localStorage.app)
            $localStorage.app.settings = $scope.app.settings;
    }, true);

    // angular translate
    $scope.lang = {isopen: false};
    $scope.langs = {en: 'English', it_IT: 'Italiano'};
    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
    $scope.setLang = function (langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
    };

    function isSmartDevice($window) {
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

    $scope.dispatch(ACTIONS_COMMANDS.CHAIN_COM_LOAD_ROUTE).then(function (response) {
        $rootScope.sideMenu=response.menus;
    })
}

angular.module('app')
    .constant('ENDPOINT_URI', window.jndi.resource.ENDPOINT_URI)
    .constant('ENDPOINT_URI_ORIGIN', window.jndi.resource.ENDPOINT_URI_ORIGIN)
    .constant('JSON_FILES_VERSION', "1.0.2")
    .controller('AppCtrl',AppCtrl)
    .controller('EmptyCtrl_',function($scope,$log){ $log.info("EmptyCtrl") }) ;
