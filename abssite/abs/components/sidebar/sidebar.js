var SidebarController= function( $log,$router,$rootScope,$timeout,ConfigurationService) {
    $log.info("SidebarController.run")
    var $this=this;
    $this.setActiveDashboardItem=function(itemId){
        $log.info("SidebarController.setActiveDashboardItem item="+itemId);
        $this.sections['chartpage'].active=itemId;
        $rootScope.$emit('onDashBoardSectionChange',itemId);
    }
    $this.sections=$rootScope.auth.user.pageSections;
    $this.isCurrentPage=function(curPageId){
        return $rootScope.curPage.id===curPageId;
    }
    var isSideBarLoaded=false,
        afterSideBarShow = function(){
        if(isSideBarLoaded) return;
        if($('ul.collapse').size()==0) return;

        $timeout(function(){
            $('ul.collapse')
                .on('show.bs.collapse', function(e) {
                    e.stopPropagation();
                    $(this).closest('li').addClass('active');
                })
                .on('hidden.bs.collapse', function(e) {
                    e.stopPropagation();
                    $(this).closest('li').removeClass('active');
                });

        }, 1000);

        $log.info("SidebarController.afterShow")
        isSideBarLoaded=true;
    }


    $rootScope.searchStructure='';
    $rootScope.sideBarLoaded=function(){
        afterSideBarShow();
        return true;
    }

}