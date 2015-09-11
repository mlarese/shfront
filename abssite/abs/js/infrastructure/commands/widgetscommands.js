/*********************************************************
 * command widgets.assign.to.scope
 *      action Load the widget
 *      param  widgetId  The id of the widget
 *      param  scope  can be scope or a attribute of the scope  es.  scope.app.dashboard
 *      param  attribute the scope's attribute that contains the widget
 *      return the assigned widget;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_WIDGETS_ASSIGN_TO_SCOPE,function(WidgetSrv){
    return { execute:function($log , widgetId , scope , attribute ) {
        return WidgetSrv.assignToScope(widgetId , scope , attribute);
    }}
},{resultKey:'widget'})
/*********************************************************
 * command widgets.load
 *      action Load the widget
 *      param  widgetId  The id of the widget
 *      return the widget;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_WIDGETS_LOAD,function(WidgetSrv){
    return { execute:function($log,widgetId ) {
        return WidgetSrv.load(widgetId);
    }}
},{resultKey:'widget'})
/*********************************************************
 * command widgets.load.all
 *      action Load all the widgets
 *      return the widget list;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_WIDGETS_LOAD_ALL,function(WidgetSrv){
    return { execute:function($log) {
        return WidgetSrv.loadAll();
    }}
},{resultKey:'widgetsList'})
/*********************************************************
 * command widgets.load.data
 *      action Load the widget data
 *      param  widgetId  The id of the widget
 *      return the widget data;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_WIDGETS_LOAD_DATA,function(DataSrv,DataServiceTransform){
    return { execute:function($log,widgetId) {
        return  DataSrv.load(widgetId)
            .then(function(data){
                data=DataServiceTransform.dataToPivotData(data);
                return data;
            });
    }}
},{resultKey:'widgetData'})


commangular.command(EV_WIDGETS_RELOAD  ,function() {
    return {
        execute: function ($log,$rootScope,widgetId) {
            $rootScope.$emit(EV_WIDGETS_RELOAD,widgetId);
        }
    }
})

commangular.command(ACTIONS_COMMANDS.RAISE_GLOBAL_EVENT  ,function() {
    return {
        execute: function ($log,$rootScope,eventName) {
            $log.info("raise.global.event="+eventName)
            //$rootScope.$emit(EV_WIDGETS_RELOAD,widgetId);
        }
    }
})

commangular.command(ACTIONS_COMMANDS.RECORD_SELECTED  ,function() {
    return {
        execute: function ($log,$rootScope,source,record) {
            $log.info("record.selected="+source)
            //$rootScope.$emit(EV_WIDGETS_RELOAD,widgetId);
        }
    }
})