describe('Menu Service load user menu',function(){
    var Service, $httpBackend, $rootScope, $scope,$dashboardState,$state,
        mockResponse = {"1":{"id":"1","name":"Dashboard","iconurl":null,"url":"","children":[{"id":"2","name":"Revenue by Rooms","iconurl":null,"url":"/dashboard_rooms","children":[],"menutype":"CONTENT"},{"id":"3","name":"Revenue by Pax","iconurl":null,"url":"/dashboard_pax","children":[],"menutype":"CONTENT"},{"id":"4","name":"Revenue","iconurl":null,"url":"/dashboard_revenue","children":[],"menutype":"CONTENT"}],"menutype":"LABEL"},"5":{"id":"5","name":"Maurone","iconurl":null,"url":"/dashboard_revenue","children":[],"menutype":"CONTENT"}};
    beforeEach(module('app'));
    beforeEach(inject(function (_MenuService_, _$httpBackend_, _$rootScope_ ) {
        Service = _MenuService_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }))

    it('Should be service configured', function () {
        expect(Service).toBeDefined();
    })

    it('Should retrieve data', function () {
        var menu ;
        $httpBackend.expectGET(Service.endPoint).respond(200, mockResponse)
        Service.loadAll().then(function (response) {
            menu =response;
        })
        $httpBackend.flush();

        expect(menu).toBeDefined();
        expect(menu["1"]).toBeDefined();
        expect(menu["1"].name).toBe('Dashboard');
    })
})