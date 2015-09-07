var DataService= function ($resource,ENDPOINT_URI,$cacheFactory) {
    var path='/bi/data/byname',
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

var DataServiceTransform= function ($translate) {
    /************************************
     *  transform data
     {
         "0":{"dimension":"Adult with child","serie":"2014","measure":"2535"}
         "1":{"dimension":"Adult with child","serie":"2014","measure":"2535"}
         "2":{"dimension":"Adult with child","serie":"2014","measure":"2535"}
    }
     ************************************/
    var dataToPivotData=function(data){
        if(angular.isString(data))
            data =angular.fromJson(data);


        try{
            if(data.length==0) return data;
            if(!data[0].dimension ) return data;
        }catch(e){
            return data;
        }

        var aSeries = {};
        var aDimensions = {};
        var aSerieData =[];
        var aSerieLabels=[];
        for(var index in data){
            var record = data[index];
            var serie = record.serie;
            var dimension = record.dimension;
            if(!aDimensions[dimension])
                aDimensions[dimension] = {}
            if(!aSeries[serie])
                aSeries[serie] = {}
        }

        for(var serie in aSeries ){
            for(var dimension in aDimensions){
                aDimensions[dimension][serie] = 0
                aSeries[serie][dimension]=0
            }
        }

        for(var index in data){
            var record = data[index];
            var serie = record.serie;
            var dimension = record.dimension;

            aDimensions[dimension][serie] = record.measure;
            aSeries[serie][dimension] = record.measure;
        }

        var serieCounter=0;
        var lng=0;
        for(var serie in aSeries ){
            var dimensionCounter=0;
            serieCounter++;
            var atDimension =[];
            for(var dimension in aDimensions){
                dimensionCounter++;
                atDimension.push( [dimensionCounter,aDimensions[dimension][serie]]   );

                if(serieCounter===1){
                    var pDimension = $translate.instant(dimension).toUpperCase();
                    aSerieLabels.push([dimensionCounter,pDimension]);
                    var curLng = pDimension.length*10+4;
                    lng+=curLng;
                }

            }
            aSerieData.push({label:serie ,data:atDimension ,bars:{order:serieCounter, "barWidth":0.3,"align":"center","show":true,"fill":1}} );
        }

        var result = {data:aSerieData,labels:aSerieLabels,labelsWidth:lng}


        return result;

    }
    var chartTransformer = function(data,transformationName){
        switch(transformationName){
            case 'stacked_bars' : return dataToPivotData(data);
            case 'sided_bars' : return dataToPivotData(data);
            default : data ;
        }
    }

    return {
        dataToPivotData:dataToPivotData,
        chartTransformer:chartTransformer
    }

}

angular.module('app')
    .service('DataService',DataService)
    .service('DataSrv',DataService)
    .service('DataServiceTransform',DataServiceTransform)