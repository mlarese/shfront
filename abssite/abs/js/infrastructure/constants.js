/********************************
 * Events without parameters
 *******************************/
const ACTIONS_EVENTS = {
    EV_WIDGETS_RELOAD_ALL: 'ev.widgets.reload.all',
    EV_GENERAL_FILTER_CHANGE_CHECKIN_DATE: 'ev.general.filter.change.checkin.date',
    EV_GENERAL_FILTER_CHANGE_CHECKOUT_DATE: 'ev.general.filter.change.checkout.date',
    EV_GENERAL_FILTER_CHANGE_OPENED_DATE: 'ev.general.filter.change.opened.date'
}

/********************************
 * Events without parameters
 *******************************/
const ACTIONS_EVENTS_PARA = {
    EV_WIDGETS_RELOAD: 'ev.widgets.reload'
}

const ACTIONS_COMMANDS = {
    COM_ALERT_BOX:'alert.box',
    COM_PAGES_REGISTER : 'pages.register',
    COM_PAGES_ASSIGN_TO_SCOPE:'pages.assign.to.scope',
    COM_WIDGETS_ASSIGN_TO_SCOPE:'widgets.assign.to.scope',
    COM_WIDGETS_LOAD_ALL:'widgets.load.all',
    COM_WIDGETS_LOAD_DATA:'widgets.load.data',
    COM_WIDGETS_LOAD:'widgets.load',
    COM_CHARTS_LOAD_CONFIG:'charts.load.config',
    COM_CHARTS_ASSIGN_TO_SCOPE:'charts.assign.to.scope',
    FLOW_CHARTWIDGET_LOAD_CHART_CONFIG:'flow.chartwidget.load.chart.config',
    CHAIN_COM_WIDGETS_SHOW:'widgets.show',
    RAISE_EVENT:'raise.event'
}

/*********************************************************
 *  creating events
 ********************************************************/
for(var event in ACTIONS_EVENTS )   window[event]=ACTIONS_EVENTS[event];
for(var event in ACTIONS_EVENTS_PARA )   window[event]=ACTIONS_EVENTS_PARA[event];
/*********************************************************
 *  creating global command names
 *********************************************************/
for(var command in ACTIONS_COMMANDS ) window[command]=ACTIONS_COMMANDS[command];


