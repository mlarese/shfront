var PagesService=function($resource,$cacheFactory,ENDPOINT_URI) {
    var path='/platform/pages',
        endPoint= ENDPOINT_URI+path,
        /**
         * rest resource
         * @type {$request}
         */
        resource = $resource(
            endPoint+'/:id',
            { id:'@_id'},
            {query:{ method: 'GET', isArray: false ,cache : $cacheFactory(endPoint) }}
        );

        angular.extend(this,new ServiceMixin(resource).mixin,{endPoint:endPoint,path:path,resource:resource} );
}

angular.module('app')
.service('PageSrv',PagesService)