var cmaCreateCommand = function(name,fn){
        commangular.command(name,fn);
    },
    cmaCreateEventEmitterNoParams=function(eventName){
        return function() {
            return {
                execute: function ($rootScope) {
                    $rootScope.$emit(eventName);
                }
            }
        }
    }
/******************************************
 *  Events without parameters
 *******************************************/
for(event in ACTIONS_EVENTS ) {
    var eventName = ACTIONS_EVENTS[event];
    cmaCreateCommand(eventName,cmaCreateEventEmitterNoParams(eventName));
}
