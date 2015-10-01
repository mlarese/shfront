var PagesService=function($rootScope,$resource,$cacheFactory,ENDPOINT_URI,extractDataFromRequestAuth) {
    var path='/platform/pages',
        endPoint= ENDPOINT_URI+path,
        /**
         * rest resource
         * @type {$request}
         */
        resource = $resource(
            endPoint+'/:id',
            { id:'@_id'},
            {query:{headers: { 'SH-LEGACY-TOKEN': $rootScope._authToken }, method: 'GET', isArray: false ,   cache : $cacheFactory(endPoint),  transformResponse:extractDataFromRequestAuth  }}
        );

        angular.extend(this,new ServiceMixin(resource).mixin,{endPoint:endPoint,path:path,resource:resource} );
}

angular.module('app').service('PageSrv',PagesService)