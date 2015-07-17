'use strict';
app.controller('LoginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
        $scope.authError = null;
        $http.post('api/login', {email: $scope.user.email, password: $scope.user.password})
            .then(function(response) {
                if ( !response.data.user ) {
                    $scope.authError = 'Email or Password not right';
                }else{
                    $state.go('app.home');
                }
            }, function(x) {
                $scope.authError = 'Server Error';
            });
    };
}])
;