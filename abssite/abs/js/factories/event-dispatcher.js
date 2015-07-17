angular.module('app')
    .factory('DispatchingService', function ($rootScope) {
        function DispatchingService() {
            var delisteners = [];
            this.dispatch = $rootScope.$emit.bind($rootScope);
            this.listen = function () {
                var args = Array.prototype.slice.call(arguments),
                    deListenFunc = $rootScope.$on.apply($rootScope, args);
                delisteners.push(deListenFunc);
                return deListenFunc;
            };
        }

        return DispatchingService;
    })
    .factory('DispatchingController', function ($rootScope) {
        function DispatchingController($scope) {
            var delisteners = [];

            if (!$scope) {
                throw new Error("A DispatchingController must have $scope to function. It wasn't found.")
            }

            this.dispatch = $rootScope.$emit.bind($rootScope);

            this.listen = function () {
                var args = Array.prototype.slice.call(arguments),
                    deListenFunc = $rootScope.$on.apply($rootScope, args);
                delisteners.push(deListenFunc);
                return deListenFunc;
            };

            $scope.$on('$destroy', function () {
                delisteners.forEach(function (deListenFunc) {
                    if(_.isFunction(deListenFunc)) {
                        deListenFunc.call();
                    }
                })
            })
        }

        return DispatchingController;
    })
    .factory('dispatch', function (Dispatcher) {
        var dispatcher = new Dispatcher();
        return dispatcher.dispatch;
    })
    .factory('Dispatcher', function($rootScope) {
        function Dispatcher() {}

        Dispatcher.prototype.dispatch = function () {
            var args = Array.prototype.slice.call(arguments);
            $rootScope.$emit.apply($rootScope, args);
        };
        return Dispatcher;
    })
;