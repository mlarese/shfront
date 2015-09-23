var StatusManagerServiceImp;
var StatusManagerService = function($log){
    var getStatesOld=function(pages,menu){
        var existingStatesList = JSONSelect.match('.url',menu)
            states={};

        for(var i = 0;i<existingStatesList .length;i++){
            var url = existingStatesList [i],
                page;
            if(url===null || url==="") continue;
            pageKey = url.replace('/','');
            var objPage = pages[pageKey];

            if(objPage){
                states[objPage.code]={code:objPage.code,template:objPage.template};
            }
        }

        return states;
    }
    var getStates=function(pages,menu){
        var existingStatesList = JSONSelect.match('.url',menu)
        states={};

        for(var i = 0;i<existingStatesList .length;i++){
            var url = existingStatesList [i],
                page;
            if(url===null || url==="") continue;

            url='app'+url;
            var aUrl = url.split('/'),
                state=aUrl.join('.');

            pageKey = aUrl[aUrl.length-1];
            var objPage = pages[pageKey];

            if(objPage){
                states[objPage.code]={code:objPage.code,template:objPage.template,state:state,father:aUrl[0]+'.'+aUrl[1],stateComponents:aUrl};
            }
        }

        return states;
    }
    var setStates=function(pages,menu ){
        var stateProvider, defineFunc ,loadFunc,state,$state  ;

        if(jndi && jndi.provider && jndi.provider.$stateProvider) {
            stateProvider = jndi.provider.$stateProvider;
            defineFunc = jndi.$fn.defineLazyState;
            loadFunc = jndi.$fn.loadLazyState;
            $state=jndi.$fn.$state;
        }
        var states = getStates(pages,menu)


        for(key in states ) {
            var curState = states[key].state,
                code = states[key].code,
                fatherState = states[key].father,
                fatherUrl='/'+states[key].stateComponents[1],
                hasFather=(states[key].stateComponents.length>2),
                tpl = states[key].template;

            if(stateProvider) {
                if(!$state.get(fatherState) && hasFather){
                    stateProvider.state(fatherState,   { url: fatherUrl , abstract: false  })
                }

                try{
                    stateProvider.state(curState, defineFunc(code, tpl, loadFunc));
                }catch(e){
                    $log.error(e)
                }
            }

        }

    }

    StatusManagerServiceImp={
        getStates:getStates,
        setStates:setStates
    };
    return  StatusManagerServiceImp
}

angular.module('app')
    .service('StatusManagerService', StatusManagerService)