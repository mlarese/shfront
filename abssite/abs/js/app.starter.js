var isAmdProject=true;
var  _JQ_CONFIG_={
    easyPieChart:   [   '../libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
    sparkline:      [   '../libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'],
    plot:           [   '../libs/jquery/flot/jquery.flot.js',
        '../libs/jquery/flot/jquery.flot.pie.js',
        '../libs/jquery/flot/jquery.flot.resize.js',
        '../libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
        '../libs/jquery/flot.categories/js/jquery.flot.categories.js',
        '../libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js',
        '../libs/jquery/flot-spline/js/jquery.flot.spline.min.js'],
    moment:         [   '../libs/jquery/moment/moment.js'],
    screenfull:     [   '../libs/jquery/screenfull/dist/screenfull.min.js'],
    slimScroll:     [   '../libs/jquery/slimscroll/jquery.slimscroll.min.js'],
    sortable:       [   '../libs/jquery/html5sortable/jquery.sortable.js'],
    nestable:       [   '../libs/jquery/nestable/jquery.nestable.js',
        '../libs/jquery/nestable/jquery.nestable.css'],
    filestyle:      [   '../libs/jquery/bootstrap-filestyle/src/bootstrap-filestyle.js'],
    slider:         [   '../libs/jquery/bootstrap-slider/bootstrap-slider.js',
        '../libs/jquery/bootstrap-slider/bootstrap-slider.css'],
    chosen:         [   '../libs/jquery/chosen/chosen.jquery.min.js',
        '../libs/jquery/chosen/bootstrap-chosen.css'],
    TouchSpin:      [   '../libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
        '../libs/jquery/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
    wysiwyg:        [   '../libs/jquery/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
        '../libs/jquery/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
    dataTable:      [   '../libs/jquery/datatables/media/js/jquery.dataTables.min.js',
        '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
        '../libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
    vectorMap:      [   '../libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
        '../libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
        '../libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
        '../libs/jquery/bower-jvectormap/jquery-jvectormap.css'],
    footable:       [   '../libs/jquery/footable/dist/footable.all.min.js',
        '../libs/jquery/footable/css/footable.core.css'],
    fullcalendar:   [   '../libs/jquery/moment/moment.js',
        '../libs/jquery/fullcalendar/dist/fullcalendar.min.js',
        '../libs/jquery/fullcalendar/dist/fullcalendar.css',
        '../libs/jquery/fullcalendar/dist/fullcalendar.theme.css'],
    daterangepicker:[   '../libs/jquery/moment/moment.js',
        '../libs/jquery/bootstrap-daterangepicker/daterangepicker.js',
        '../libs/jquery/bootstrap-daterangepicker/daterangepicker-bs3.css'],
    tagsinput:      [   '../libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
        '../libs/jquery/bootstrap-tagsinput/dist/bootstrap-tagsinput.css']

};
var _PG_CONFIG_ = {
    'pages/dashboard/dashboard':[].concat(_JQ_CONFIG_.plot,_JQ_CONFIG_.sortable)
    ,'pages/quickreport/quickreport':[].concat(_JQ_CONFIG_.plot,_JQ_CONFIG_.sortable,_JQ_CONFIG_.daterangepicker)
}

define([
    'angularAMD',
    'jquery',
    'angular-ui-router',
    "ngload",
    "commangular",
    "tmhDynamicLocale",
    "angular-animate",
    "angular-aria",
    "angular-cookies",
    "angular-messages",
    "angular-resource",
    "angular-sanitize",
    "angular-touch",
    "ngStorage",
    "ui-utils",
    "ui-bootstrap-tpls",
    "ocLazyLoad",
    "ui-load",
    "facilities"
],function (angularAMD) {
    console.log('Bootstrap')
    alert("")
    var app = angular.module("app", [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ui.router',
        'ui.bootstrap',
        'ui.utils',
        'ui.load',
        'ui.jq',
        //'oc.lazyLoad',
        //'pascalprecht.translate',

        'facilities',
        'commangular',
        //'ct.ui.router.extras',
        'tmh.dynamicLocale'
    ]);

    var ret = angularAMD.bootstrap(app) ;
    require("app-loader")
    return ret;

});

