describe('Data Service  to load data inside widgets',function(){
    var DataService,$httpBackend,
        mockResponse={"perc":70,"unit":"€","value":150}
        ;
    beforeEach( module('app'));
    beforeEach(inject(function (_DataService_,_$httpBackend_) {
        DataService=_DataService_;
        $httpBackend=_$httpBackend_;
    }))

    it('DataService should be defined',function(){
        expect(DataService).toBeDefined();
        expect(DataService.loadAll).toBeDefined();
        expect(DataService.resource).toBeDefined();
        expect(DataService.path).toBe('/loaddataforwidget');
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
})
