// Karma configuration
// Generated on Fri Jul 17 2015 09:30:15 GMT+0200 (ora legale Europa occidentale)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../libs/angular/angular/angular.js',
      '../libs/angular/angular-aria/angular-aria.js',
      '../libs/angular/oclazyload/dist/ocLazyLoad.js',
      '../libs/angular/angular-ui-router/release/angular-ui-router.js',
      '../libs/angular/angular-cookies/angular-cookies.js',
      '../libs/angular/angular-messages/angular-messages.js',
      '../libs/angular/angular-resource/angular-resource.js',
      '../libs/angular/angular-sanitize/angular-sanitize.js',
      '../libs/angular/ngstorage/ngStorage.js',
      '../libs/angular/angular-touch/angular-touch.js',
      '../libs/angular/angular-animate/angular-animate.js',
      '../libs/angular/angular-mocks/angular-mocks.js',
      '../libs/angular/commangular/commangular.js',
      '../libs/angular/angular-bootstrap/ui-bootstrap-tpls.js',
      '../libs/angular/angular-bootstrap/ui-bootstrap-tpls.js',
      '../libs/angular/angular-ui-utils/ui-utils.js',
      '../test/config.js',
      '../abs/js/directives/*.js',
      '../abs/js/infrastructure/*.js',
      '../abs/js/infrastructure/commands/*.js',
      '../abs/js/infrastructure/events/*.js',
      //'../abs/js/config.js',
      //'../abs/js/config.lazyload.js',
      //'../abs/js/config.router.js',
      '../abs/js/main.js',
      //'../abs/js/*.js',
      '../abs/js/services/*.js',
      //'../abs/js/controllers/*.js',

      '../abs/js/factories/*.js',
      '../abs/js/filters/*.js',

      '../test/commands/*.js',
      '../test/app/*.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter     'hy-html', 'html','progress'
    reporters: [ 'html' ],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome' ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
