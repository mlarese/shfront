var PagesService=function($resource,$cacheFactory,ENDPOINT_URI) {
    var endPoint= ENDPOINT_URI+'/pages',
        pages=null,
        getPages = function(){ return pages; },
        resource = $resource(
            endPoint,
            { id:'@_id'},
            {query:{ method: 'GET', isArray: false ,cache : $cacheFactory(endPoint) }}
        ),
        query = function(){
            return resource.query().$promise.then(
                function (response) {
                    pages=response.toJSON();
                    return pages;
                },
                function (error) {
                    pages=null;
                    return pages;
                }

            );
        },
        load =  function(id) {
            return query()
                .then(function (storage) {
                    var elem = storage[id];
                    return elem;
                })
        };
    return {
        endPoint:endPoint,
        query:query,
        loadAll:query,
        load:load,
        hasPages:function(){return pages!=null},
        pages:  getPages
    };
}

angular.module('app')
.service('PagesService',PagesService)