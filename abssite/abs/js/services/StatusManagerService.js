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
};
var AuthService= function ($rootScope,$resource,ENDPOINT_URI,$state,$timeout) {

    var path='/platform/legacyauth/',
        endPoint=  ENDPOINT_URI+path,
        resource,
        auth=function(response){
            loadAll().then(function(response){

                //console.dir(response)
                response = angular.fromJson(response);
console.log(response)

                if(response.success===0){
                    $rootScope._authToken=null;
                    $rootScope._authError=response.message;
                    return false;
                }

                $rootScope._authError="Ok";
                $rootScope._authToken=response.authentication['token'];

                $timeout(function(){
                    $state.go('app.home')
                },10)

            })
        },
        loadAll= function () {
            return resource.query().$promise.then(
                function (response) {
                    items = response.toJSON();
                    return items;
                },
                function (error) {
                    items = null;
                    return error;
                }
            )
        };

    resource=$resource(
        endPoint+'/:id',
        { id:'@_id'},
        {
            query:{
                method: 'GET',
                isArray: false ,
                cache : false ,
                headers: { 'SH-LEGACY-TOKEN': $rootScope._authToken }
            }
        }
    ) ;

    angular.extend(this,{auth:auth} );
}

angular.module('app')
    .service('StatusManagerService', StatusManagerService)
    .service('AuthService',AuthService)