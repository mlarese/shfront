angular.module('app')
    .directive('customScrollbar', function() {
        return {
            scope: {},

            link: function(scope,elem,attrs) {
                elem.mCustomScrollbar({ theme:"minimal-dark" });
            }
        };
});