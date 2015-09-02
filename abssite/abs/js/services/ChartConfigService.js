var ChartConfigService= function ($resource,ENDPOINT_URI,$cacheFactory) {
    var path='/platform/widget/options',
        endPoint= ENDPOINT_URI+path,
        resource=$resource(
            endPoint+'/:id',
            { id:'@_id'},
            {
                query:  { method: 'GET', isArray: false ,cache : $cacheFactory(endPoint) },
                update: { method: 'PUT' }
            }
        ) ;
    angular.extend(this,new ServiceMixin(resource).mixin,{endPoint:endPoint,path:path,resource:resource  } );
}

angular.module('app')
    .service('ChartConfigService',ChartConfigService)
    .service('ChartConfigSrv',ChartConfigService)