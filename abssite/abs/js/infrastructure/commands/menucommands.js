/*********************************************************
 * command menus.load.all
 *      action Load all the menus
 *      return the menu list;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_MENUS_LOAD_ALL,function(MenuService,StatusManagerService){
    return { execute:function() {
        return MenuService.loadAll() ;
    }}
},{resultKey:'menus'})