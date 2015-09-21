angular.module('app')
    .directive('customScrollbar', function() {
        return {
            scope: {},
            restrict: 'EA',
            link: function(scope,elem,attrs) {
                elem.mCustomScrollbar({
                    theme:"minimal-dark",
                    axis:"yx",
                    scrollbarPosition:'outside' ,
                    updateOnContentResize: true
                });
            }
        };

    })
    .directive('customvScrollbar', function() {
        return {
            scope: {},
            restrict: 'EA',
            link: function (scope, elem, attrs) {
                elem.mCustomScrollbar({
                    theme: "minimal-dark",
                    axis: "y",
                    scrollbarPosition: 'outside',
                    updateOnContentResize: true
                });
            }
        }
    })