var MenuService = function ($resource, ENDPOINT_URI,ENDPOINT_URI_ORIGIN, $cacheFactory,extractDataFromRequestAuth) {
    var path = '/platform/menuitems',
        endPoint = ENDPOINT_URI + path,
        queryDefParameters= (ENDPOINT_URI_ORIGIN=='file'?{id: '@_id',v:new Date().getTime()}:{id: '@_id'}),
        resource = $resource(
            endPoint + '/:id',
            queryDefParameters,
            {
                query: {method: 'GET', isArray: false, cache: $cacheFactory(endPoint) ,transformResponse:extractDataFromRequestAuth },
                update: {method: 'PUT'}
            }
        );
    angular.extend(this, new ServiceMixin(resource).mixin, {endPoint: endPoint, path: path, resource: resource });
}


angular.module('app')
    .service('MenuService', MenuService)