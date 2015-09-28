var WidgetsService= function ($resource,ENDPOINT_URI,ENDPOINT_URI_ORIGIN,$cacheFactory,extractDataFromRequestAuth) {
    var path='/platform/widgets',
        endPoint= ENDPOINT_URI+ path,
        resource;
        if(ENDPOINT_URI_ORIGIN=='file')
            endPoint=endPoint+'?'+new Date().getTime();

        resource=$resource(
            endPoint+'/:id',
            { id:'@_id'},
            {query:{ method: 'GET', isArray: false ,cache : $cacheFactory(endPoint) ,transformResponse:extractDataFromRequestAuth }}
        ) ;
        angular.extend(this,new ServiceMixin(resource).mixin,{endPoint:endPoint,path:path,resource:resource} );
}

angular.module('app')
    .service('WidgetsService',WidgetsService)
    .service('WidgetSrv',WidgetsService)
