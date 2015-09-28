angular.module('facilities', [])
    .factory('facilities', [
                 '$log','$localStorage','$rootScope','WIDGET_CONFIG',
        function ($log , $localStorage , $rootScope , WIDGET_CONFIG) {
            var self=this,
                namespace = function(root,path,obj) {
                    obj=obj||{};
                    var tokens = path.split('\.');
                    for (var i = 0; i < tokens.length; i++) {
                        var token = tokens[i];
                        var existingChild = root[token];
                        if (existingChild === undefined) {
                            if(i==tokens.length-1)
                                existingChild = obj;
                            else
                                existingChild = {};
                            root[token] = existingChild;
                        }
                        root = existingChild;
                    }
                    return root;
                },
                getByPath=function(root,path,defaultValue){
                    defaultValue=defaultValue||{};
                    var tokens = path.split('\.') ;
                    for (var i = 0; i < tokens.length; i++) {
                        var token = tokens[i];
                        var existingChild = root[token];
                        if (existingChild === undefined) {
                            return defaultValue;
                        }
                        root = existingChild;
                    }
                    return true;
                },
                isDefined = function(root,path){
                    var tokens = path.split('\.') ;
                    for (var i = 0; i < tokens.length; i++) {
                        var token = tokens[i];
                        var existingChild = root[token];
                        if (existingChild === undefined) {
                           return false;
                        }
                        root = existingChild;
                    }
                    return true;
                },
                init$localStorage=function(scope,pagePath,pageName,initConfig){
                    var page= pagePath + '.'+ pageName;
                    if(pageName=='.')
                        page=pagePath;
                    initConfig=initConfig||{};
                    namespace(scope,page,initConfig);

                    /***** uncomment to enable local storage *******
                    if ( isDefined($localStorage,page)) {
                        namespace(scope,page,getByPath($localStorage,'app.pages.home') );
                    } else {
                        namespace($localStorage,page,  initConfig);
                    }
                    *****************************************/
                },
                initModule=function(scope,storageOption,appOptions){
                    if(!storageOption.initConfig) storageOption.initConfig={};
                    init$localStorage(scope,storageOption.pagePath,storageOption.pageName,storageOption.initConfig);
                    scope.app.settings['wide']=false;
                    scope.app.settings['headerVisible']=true;
                    scope.app.settings['asideVisible']=true;
                    scope.app.settings['container']=false;
                },
                sizeToColumns=function(size){
                    return WIDGET_CONFIG.widgetSize[size];
                },
                heightToPixel=function(height){
                    return WIDGET_CONFIG.widgetHeight[height];
                }

                var fn = {
                    ns:namespace,
                    isDefined:isDefined,
                    getByPath:getByPath,
                    init$localStorage:init$localStorage,
                    sizeToColumns:sizeToColumns,
                    heightToPixel:heightToPixel,
                    initModule:initModule
                };

                if(!$rootScope.facilities)
                    $rootScope.facilities=fn;

            return fn
        }
    ])
    /*
    *   Extract data from request.
    *   Expectingt success and authentication attributes
    * */
    .factory('extractDataFromRequestAuth',function(){
        // Todo authentication check
        var extractDataFromRequest = function(response, headersGetter){
            if(angular.isString( response ))
                response = angular.fromJson(response);

            if(response.data){
                return response.data
            }

            return  response;
        }
        return extractDataFromRequest;
    })

