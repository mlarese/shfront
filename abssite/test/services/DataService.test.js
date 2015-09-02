describe('Data Service  to load data inside widgets',function(){
    var DataService,$httpBackend,DataServiceTransform,transformationName='stacked_bars',
        mockResponse={"perc":70,"unit":"€","value":150},
        testData={"0":{"dimension":"Adult with child","serie":"2014","measure":"2535"},"1":{"dimension":"Couples","serie":"2014","measure":"104181"},"2":{"dimension":"Couples with child","serie":"2014","measure":"13940"},"3":{"dimension":"Families","serie":"2014","measure":"138"},"4":{"dimension":"Single","serie":"2014","measure":"68296"},"5":{"dimension":"Three Adults","serie":"2014","measure":"10126"},"6":{"dimension":"Couples","serie":"2015","measure":"36513"},"7":{"dimension":"Couples with child","serie":"2015","measure":"2934"},"8":{"dimension":"Families","serie":"2015","measure":"1601"},"9":{"dimension":"Single","serie":"2015","measure":"34115"},"10":{"dimension":"Three Adults","serie":"2015","measure":"4087"}}
        ;
    beforeEach( module('app'));
    beforeEach(inject(function (_DataService_,_$httpBackend_,_DataServiceTransform_) {
        DataService=_DataService_;
        DataServiceTransform=_DataServiceTransform_;
        $httpBackend=_$httpBackend_;
    }))

    it('DataService should be defined',function(){
        expect(DataService).toBeDefined();
        expect(DataServiceTransform).toBeDefined();
        expect(DataServiceTransform.chartTransformer).toBeDefined();
        expect(DataService.loadAll).toBeDefined();
        expect(DataService.resource).toBeDefined();
        expect(DataService.path).toBe('/bi/data/byname');
    })

    it('Should get widget data',function(){
        var value;
        $httpBackend.expectGET(DataService.endPoint+"/consistency_record").respond(200,mockResponse);
        DataService.load('consistency_record').then(function (resp) {
            value=resp;
        })

        $httpBackend.flush();
        expect(value).toBeDefined();
        expect(value.perc).toBe(70);

    })

    it('Should transform data',function(){
        var res = DataServiceTransform.chartTransformer(testData,transformationName);
        console.log("end.")
    });
})
