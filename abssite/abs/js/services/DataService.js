var DataService= function ($resource,ENDPOINT_URI,$cacheFactory) {
    var path='/loaddataforwidget',
        endPoint= ENDPOINT_URI+path,
        /**
         * override load function
         * @param id
         */
        load=function(id){
            return resource.get({id:id}).$promise.then(
                function (response) {
                    return response.toJSON();
                },
                function (error) {
                    return null;
                }
            )
        }
        resource=$resource(
            endPoint+'/:id',
            { id:'@_id'},
            {
                query:{ method: 'GET', isArray: false ,cache : $cacheFactory(endPoint) },
                update: { method: 'PUT' }
            }
        ) ;
    angular.extend(this,new ServiceMixin(resource).mixin,{endPoint:endPoint,path:path,resource:resource ,load:load} );
}

angular.module('app')
    .service('DataService',DataService)
    .service('DataSrv',DataService)