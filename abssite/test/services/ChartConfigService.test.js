describe('Service to load charts configurations',function(){
    ChartConfigService;
    beforeEach( module('app' ));
    beforeEach(inject(function (_ChartConfigService_) {
        ChartConfigService=_ChartConfigService_;
    }))

    it('Should be service configured',function(){
        expect(ChartConfigService).toBeDefined();
    })
})
