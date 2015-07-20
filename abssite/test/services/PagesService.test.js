describe('Pages service test (loading pages definitions)',function() {
    var $httpBackend, $rootScope, PagesService,
        mockResponse = {
            "consistency_record": {
                "code": "consistency_code",
                "template": "consistency_template",
                "structure": {
                    "title": "consistency_title"
                },
                "widgets": [
                    {"code": "consistency_code", "width": "small", "position": "1"}
                ]
            }
        }

    beforeEach(module('app'));
    beforeEach(inject(function (_$httpBackend_, _$rootScope_, _PagesService_) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        PagesService = _PagesService_;
    }))

    it('Retrieve pages definitions', function () {
        var res;
        expect(PagesService.hasPages()).toBeFalsy();
        $httpBackend.expectGET(PagesService.endPoint).respond(200, mockResponse);
        PagesService.query();
        $httpBackend.flush();

        res = PagesService.pages();

        expect(PagesService.hasPages()).toBeTruthy();
        expect(res).toBeDefined();
        expect(res.consistency_record).toBeDefined();
        expect(res.consistency_record.code).toBeDefined();
        expect(res.consistency_record.code).toBe('consistency_code');

    })


    it('Retrieve page consistency_record', function () {
        var res;
        $httpBackend.expectGET(PagesService.endPoint).respond(200, mockResponse);
            PagesService.load('consistency_record');
        $httpBackend.flush();


    })
});