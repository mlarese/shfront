var ChartpageController = function($log,$router,$rootScope,$timeout,$translate,WIDGETS,Urls,blockUI,ConfigurationService) {
    $log.info("ChartpageController.run");

    var pageId='chartpage',
        scope = {
            title:'dashboard',
            getSubTitle:function(){  return $rootScope.auth.user.pageSections[pageId].active},
            pageId:pageId,
            sizeToColumns:$rootScope.sizeToColumns,
            dashBoardFilter:$rootScope.dashBoardFilter,
            sections:$rootScope.auth.user.pageSections[pageId]
        }


    angular.extend(this,scope,WIDGETS.container);
    var $this=this;
    $rootScope.curPage.id=$this.pageId;


    var copyData=function( wdg ){
            for(var widgetId in wdg) {
                var pgSide=wdg[widgetId];

                for (var i = 0; i < pgSide.length; i++) {
                    var curWidget = pgSide[i];
                    if(curWidget.type === 'chartwidget'){
                        if(charts.__data[curWidget.id]) {
                            curWidget.data = charts.__data[curWidget.id];
                            curWidget.colors = charts.__colors;
                        }
                    }

                    if (curWidget.type === 'widget') continue;

                    var chartDef = charts.__data[curWidget.id];

                    if (curWidget.type == 'progresswidget') {
                        angular.forEach(chartDef, function(value, key) {
                            wdg[widgetId][i][key]=value;
                        });
                    }else if (curWidget.type == 'chartwidget') {
                        for(var labelIndex=0;labelIndex<chartDef.labels.length;labelIndex++){
                            chartDef.labels[labelIndex] [1]= $translate.instant(chartDef.labels[labelIndex] [1] );
                        };
                    }

                }

            }
        },
        defaultSection=$rootScope.auth.user.pageSections[$this.pageId]['active'],
        requireChartData = function(wdg){
            var filter = $rootScope.dashBoardFilter,
                params=  'structureId='+filter.structure.id
                    +'&structureName='+filter.structure.description
                    +'&checkoutDateFrom='+filter.checkoutDateFrom
                    +'&checkoutDateTo='+filter.checkoutDateTo
                    +'&checkinDateFrom='+filter.checkinDateFrom
                    +'&checkinDateTo='+filter.checkinDateTo
                    +'&openDateFrom='+filter.openDateFrom
                    +'&openDateTo='+filter.openDateTo

                    +'&checkinYearFrom='+filter.checkinYearFrom
                    +'&checkinYearTo='+filter.checkinYearTo
                    +'&checkoutYearFrom='+filter.checkoutYearFrom
                    +'&checkoutYearTo='+filter.checkoutYearTo
                    +'&openYearFrom='+filter.openYearFrom
                    +'&openYearTo='+filter.openYearTo

                    +'&checkinMonthFrom='+filter.checkinMonthFrom
                    +'&checkinMonthTo='+filter.checkinMonthTo
                    +'&checkoutMonthFrom='+filter.checkoutMonthFrom
                    +'&checkoutMonthTo='+filter.checkoutMonthTo
                    +'&openMonthFrom='+filter.openMonthFrom
                    +'&openMonthTo='+filter.openMonthTo

                    +'&timeout='+new Date().getTime()
                    +'',
                dataCall=Urls.router +'?'+params;
                $log.info(dataCall);

            charts.__onDataChange=function() {
                copyData(wdg);
                $timeout(function () {
                    $log.info('charts.__onDataChange')
                    charts.__plotAll();
                    blockUI.reset();
                } ,100);
            }
            $script(dataCall,'data');
        },
        loadChartPageWidgets = function(){
            var section=$this.sections.active;
            blockUI.reset();
            blockUI.start();
            var wdg=ConfigurationService.widgets(pageId,section);
            $log.info('ChartpageController.loadChartPageWidgets pageId='+pageId +' section='+section )
            $this.widgets=wdg;
            requireChartData(wdg ) ;

        }

    var loadChartTimer=false;
    $rootScope.$on('onDashBoardFilterChange',function(event,structure){
        $this.dashBoardFilter=$rootScope.dashBoardFilter;
        if($rootScope.curPage.id!=$this.pageId) return;
        $log.info("ChartpageController.onDashBoardFilterChange");

        if(loadChartTimer) $timeout.cancel(loadChartTimer);
        loadChartTimer= $timeout( loadChartPageWidgets ,400)

    });

    $rootScope.$on('onDashBoardSectionChange',function(event,section){
        $this.dashBoardFilter=$rootScope.dashBoardFilter;
        if($rootScope.curPage.id!=$this.pageId) return;
        loadChartPageWidgets();
    });

    $rootScope.$on('onSiteLanguageChange',function(event,section){
        $this.dashBoardFilter=$rootScope.dashBoardFilter;
        if($rootScope.curPage.id!=$this.pageId) return;
        loadChartPageWidgets();
    });

    loadChartPageWidgets();
};