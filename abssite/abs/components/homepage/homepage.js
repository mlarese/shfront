var HomepageController = function($log,$router,$rootScope,WIDGETS,ConfigurationService) {
    $log.info("HomepageController.run");

    var scope = {
        title:'home',
        pageId:'homepage',
        sizeToColumns:$rootScope.sizeToColumns,
        dashBoardFilter:$rootScope.dashBoardFilter
    }

    angular.extend(this,scope,WIDGETS.container);
    var $this=this;

    $rootScope.curPage.id=$this.pageId
    $rootScope.homepage=this;

    var loadWidgets = function(){
        $this.widgets=ConfigurationService.widgets($this.pageId  );
    }
    loadWidgets();

    $rootScope.$on('onDashBoardFilterChange',function(){
        $this.dashBoardFilter=$rootScope.dashBoardFilter;
        if($rootScope.curPage.id!=$this.pageId) return;
    });


};

