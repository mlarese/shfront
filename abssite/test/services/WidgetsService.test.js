describe('WidgetsService service test (loading widgets definitions)',function(){
    var WidgetsService,$httpBackend,ENDPOINT_URI,mockResponse;

    mockResponse={
        "consistency_record":{
            "code": "consistency_code",
            "type": "consistency_type",
            "structure":{
                "title": "Average revenue",
                "text": "Bookings",
                "config":{
                    "events":{
                        "reload":[
                            "ev.general.filter.change.checkout.date"
                            ,"ev.general.filter.change.checkin.date"
                            ,"ev.general.filter.change.opened.date"
                        ]
                    }
                }
            },
            "context":"",
            "graphic":""
        }

    };

    beforeEach(module('app'));
    beforeEach(inject(function(_WidgetsService_,_$httpBackend_,_ENDPOINT_URI_){
        WidgetsService=_WidgetsService_;
        $httpBackend=_$httpBackend_;
        ENDPOINT_URI=_ENDPOINT_URI_;
    }))

    it('Service should be defined',function(){
        expect(WidgetsService).toBeDefined();
    })

    it('Should have loadAll and items method',function(){
        expect(WidgetsService.loadAll).toBeDefined();
        expect(WidgetsService.items).toBeDefined();
    })
    it('Should be endpoint=widgets',function(){
        expect(WidgetsService.endPoint).toBe(ENDPOINT_URI+"/platform/widgets");
    })
    it('Should give the array widgets configurations',function(){
        var widgets;
        $httpBackend.expectGET(WidgetsService.endPoint).respond(200, mockResponse);
            WidgetsService.loadAll().then(function (widgetsDefinitions) {
                widgets=widgetsDefinitions;
            });
        $httpBackend.flush();

        expect(widgets).toBeDefined();
        expect(widgets.consistency_record).toBeDefined();
    })

    it('Should load a widget',function(){
        var widget;
        $httpBackend.expectGET(WidgetsService.endPoint).respond(200,mockResponse);
            WidgetsService.load('consistency_record').then(function (widgetResponse) {
                widget=widgetResponse;
            })
        $httpBackend.flush();
        expect(widget).toBeDefined();
        expect(widget.code).toBeDefined();
        expect(widget.code).toBe('consistency_code');
    })

    it('Should assign to scope a widget',function(){
        var scope={};
        expect(WidgetsService.assignToScope).toBeDefined();
        $httpBackend.expectGET(WidgetsService.endPoint).respond(200,mockResponse);
            WidgetsService.assignToScope('consistency_record',scope,'widget');
        $httpBackend.flush();
        expect(scope.widget).toBeDefined();
    })
})
