describe('Pages service test (loading pages definitions)',function() {
    var $httpBackend,
        $rootScope,
        PageSrv,
        pageBackEndResource,
        mockResponse = {
            "consistency_record": {
                "code": "consistency_code",
                "template": "consistency_template",
                "structure": {
                    "title": "consistency_title"
                },
                "widgets": [
                    {"code": "consistency_code_1", "width": "small", "position": "1"},
                    {"code": "consistency_code_2", "width": "small", "position": "1"}
                ]
            }
        }

    beforeEach(module('app'));
    beforeEach(inject(function (_$httpBackend_, _$rootScope_, _PageSrv_) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        PageSrv = _PageSrv_;
        pageBackEndResource=PageSrv.resource;
    }))
    it('Should point to /pages',function(){
        expect(PageSrv.path).toBe('/platform/pages');
    })
    it('Back End Resource must be defined',function(){
        expect(pageBackEndResource).toBeDefined();
    })

    it('Retrieve page consistency_record', function () {
        var res,page;
        $httpBackend.expectGET(PageSrv.endPoint).respond(200, mockResponse);
            PageSrv.load('consistency_record')
                .then(function(loadedPage){
                    page=loadedPage;
                });

        $httpBackend.flush();
        expect(page).toBeDefined();
        expect(page.code).toBeDefined();
        expect(page.code).toBe('consistency_code');
    })

    it('Assign page to scope', function () {
        var res,page,scope,id,attribute;
        id = 'consistency_record';
        scope={};
        attribute='widgets';
        $httpBackend.expectGET(PageSrv.endPoint).respond(200, mockResponse);
        PageSrv.assignToScope(id,scope,attribute);
        $httpBackend.flush();

        expect(scope.widgets).toBeDefined();
    })

    afterEach(inject(function($rootScope) {
       // $rootScope.$apply();
    }));

});