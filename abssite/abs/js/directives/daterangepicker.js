angular.module('app')
.directive('mmDateRange', function($rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {  },
        link: function(scope, iElement, iAttrs) {
            iElement.daterangepicker({
                format: 'DD-MM-YYYY',
                startDate: '01-01-2015',
                endDate: '31-12-2015',
                buttonClasses: ['btn', 'btn-sm'],
                applyClass: 'btn-primary',
                locale: {
                    applyLabel: 'Ok',
                    cancelLabel: 'Annulla',
                    fromLabel: 'Da',
                    toLabel: 'A',
                    customRangeLabel: 'Custom',
                    daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven','Sab'],
                    monthNames: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dec'],
                    firstDay: 1
                }

            }, function(start, end, label) {
                    //console.dir( iElement.data('daterangepicker')  )

                }
            )
        }
    };
});