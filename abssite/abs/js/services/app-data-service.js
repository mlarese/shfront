angular.module('app')
    .constant( 'ENDPOINT_URI', window.jndi.resource.ENDPOINT_URI)
    .constant( 'ENDPOINT_METHOD', window.jndi.resource.ENDPOINT_METHOD)
    .constant( 'JSON_FILES_VERSION', "1.0.2" )

    .service(  'RestObjectFactory',     function( $resource,  $log,  $rootScope,  ENDPOINT_URI ,  JSON_FILES_VERSION  ,  $cacheFactory){
        var defineResource=function(path,options,entryPoint){
            entryPoint=entryPoint||ENDPOINT_URI+'/'+path+'/:id';
            var updateAction = {
                    update: { method: 'PUT' }
                },
                actions=angular.extend(updateAction,options||{}     ),
                paramDefaults={ id:'@_id'/*,version:JSON_FILES_VERSION*/},
                service= $resource( entryPoint, paramDefaults, actions );

                service.loadAll = function(){
                    return service.query().$promise;
                };
                service.assignToScope =  function(id,scope,attribute,subId) {
                    return service.loadAll()
                        .then(function (storage) {

                            var elem = storage[id];
                            if(subId && elem[subId])
                                elem=elem[subId]

                            if(attribute=='.')
                                angular.extend(scope,elem);
                            else
                                scope[attribute]=elem;

                            return elem;
                        })
                };
                service.load =  function(id) {
                    return service.loadAll()
                        .then(function (storage) {
                            var elem = storage[id];
                            return elem;
                        })
                };
            return service;
        };
        return {
            defineResource:defineResource,
            restFn:function(cache,isArray,fnName){
                var obj= {};
                obj[fnName]={ method: 'GET', isArray: isArray ,cache : $cacheFactory(cache) };
                return obj;
            },
            arrayToObjectTransformer:function(data, header) {
                var obj = angular.fromJson(data),
                    transformed={};
                angular.forEach(obj, function(item, idx) {
                    transformed[item.id] = item;
                });
                return transformed;
            }
        }
    })

    .service(  'ChartConfigSrv_',        function(RestObjectFactory,$cacheFactory){
        var fn='query',
            options= RestObjectFactory.restFn('ChartConfigSrv',false,fn);

        return RestObjectFactory.defineResource('chartsconfig', options);
    })
