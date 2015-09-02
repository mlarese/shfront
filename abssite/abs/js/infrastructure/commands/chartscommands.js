/*********************************************************
 * command charts.assign.to.scope
 *      action Load the chart options
 *      param  optionId  T 
 *      param  scope  can be scope or a attribute of the scope  es.  scope.app.dashboard
 *      param  attribute the scope's attribute that contains the option
 *      return the assigned options;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_CHARTS_ASSIGN_TO_SCOPE,function(ChartConfigSrv){
    return { execute:function($log , optionId , scope , attribute ) {
        return ChartConfigSrv.assignToScope(optionId , scope , attribute)
    }}
},{resultKey:'chartConfig'})
/*********************************************************
 * command charts.load.config
 *      action Load the chart Config
 *      param  widget
 *      return the chart config;
 *********************************************************/
commangular.command(ACTIONS_COMMANDS.COM_CHARTS_LOAD_CONFIG,function(ChartConfigSrv){
    return { execute:function($log , widget ) {
        if(widget && widget.graphic && widget.graphic.options)
            return ChartConfigSrv.load(widget.graphic.options );
        else return null;
    }}
},{resultKey:'chartConfig'})





