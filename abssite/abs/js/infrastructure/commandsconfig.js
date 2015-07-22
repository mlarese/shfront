/*********************************************************
 Components:
 Command  : atomic command
 accept parameters [optional], injections [optional]
 return mixed [optional]
 *******************************************
 W A R N I N G
 every command must be registered as event
 in order to dispatch it
 *******************************************
 Chain    : chain of commands.
 returns chain of returns as object
 Event    : event to raise
 Flow     : conditional command, the command must exist
 *********************************************************/

angular.module('app')
    .config(function($commangularProvider){
        /*********************************************************
         * Events
         *********************************************************
         *      Flow commands
         *********************************************************/

        var flows={
                /*********************************************************
                 * command flow.chartwidget.load.chart.config
                 *      condition widget.type == 'chartwidget'
                 *      action charts.load.config
                 *********************************************************/
                'flow.chartwidget.load.chart.config':$commangularProvider
                    .asFlow()
                    .link("widget.type == 'chartwidget'")
                    .to(ACTIONS_COMMANDS.COM_CHARTS_LOAD_CONFIG)
            },
            chains = [
                {
                    chainName:ACTIONS_COMMANDS.CHAIN_COM_WIDGETS_SHOW
                    ,commands:[
                        ACTIONS_COMMANDS.COM_WIDGETS_LOAD
                        ,ACTIONS_COMMANDS.COM_WIDGETS_LOAD_DATA
                        ,ACTIONS_COMMANDS.FLOW_CHARTWIDGET_LOAD_CHART_CONFIG
                    ]
                }
            ],
            add = function(mapTo) {
                if (angular.isArray(mapTo)){
                    var sequence = $commangularProvider.mapTo(mapTo[0]).asSequence();
                    for(var j=1;j<mapTo.length;j++){
                        var sMap = mapTo[j];
                        if(flows[sMap]) sequence=sequence.add(flows[sMap])
                        else sequence=sequence.add(sMap)
                    }
                }else if(angular.isObject(mapTo) ) {
                    var sequence = $commangularProvider.mapTo(mapTo.chainName).asSequence();
                    commands = mapTo.commands;
                    for(var j=0;j<commands.length;j++){
                        var sMap = commands[j];
                        if(flows[sMap]) sequence=sequence.add(flows[sMap])
                        else sequence=sequence.add(sMap)
                    }
                }else if(angular.isString(mapTo) ) {
                    $commangularProvider.mapTo(mapTo).asSequence().add(mapTo);
                }else{
                    $commangularProvider.mapTo(mapTo).asSequence().add(mapTo);
                }

            };

        for(var event in ACTIONS_EVENTS_PARA) add( ACTIONS_EVENTS_PARA[event] );
        for(var event in ACTIONS_EVENTS) add( ACTIONS_EVENTS[event] );
        for(var command in ACTIONS_COMMANDS ) add( ACTIONS_COMMANDS[command] );
        for (var i=0;i<chains.length;i++)  add(chains[i]);


    })