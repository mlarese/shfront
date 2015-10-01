/*********************************************************
 * command pages.register
 *      action create the page attributes in the scope
 *      param  scope
 *      param  pageConfig parametri di configurazione della pagina
 *      return the scope;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_PAGES_REGISTER,function(facilities){
    return { execute:function($log , scope,pageConfig) {
        facilities.initModule( scope,  pageConfig  );
        return scope;
    }}
},{resultKey:'scope'})
/*********************************************************
 * command pages.assign.to.scope
 *      action Load the pages attributes
 *      param  id  the id of the page
 *      param  scope  can be scope or a attribute of the scope  es.  scope.app.dashboard
 *      param  attribute the scope's attribute
 *      return the assigned page;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_PAGES_ASSIGN_TO_SCOPE,function(PageSrv){
    return { execute:function($log , id , section , scope , attribute ) {
        return PageSrv.assignToScope(id , scope , attribute,section);
    }}
},{resultKey:'page'})
/*********************************************************
 * command pages.load.all
 *      action Load all the pages
 *      return the pages list;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_PAGES_LOAD_ALL,function(PageSrv){
    return { execute:function($log) {
        $log.info("PageSrv.loadAll.invoke")
        return PageSrv.loadAll();
    }}
},{resultKey:'pages'})

commangular.command(ACTIONS_COMMANDS.COM_ADD_ROUTER_STATES,function(StatusManagerService){
    return { execute:function(pages,menus) {
        StatusManagerService.setStates(pages,menus);
    }}
})

commangular.command(ACTIONS_COMMANDS.COM_APP_AUTHENTICATION,function($log,AuthService){
    return { execute:function() {
        $log.info('AuthService.auth.invoke');
        AuthService.auth();
    }}
})
