describe('Configuration Service (retrieve configurations)',function(){
    var scope,ConfigurationService;
    beforeEach(function() {
        module('app', function() {

        });
        inject(function($rootScope , _ConfigurationService_){
            scope=$rootScope.$new();
            ConfigurationService=_ConfigurationService_;
        })
    });

    it('Scope should be defined',function(){
        expect(scope).toBeDefined();
    })

    it('ConfigurationService should be defined',function(){
        expect(ConfigurationService).toBeDefined();
    })

    it('MainPage title should be ABS dashboard (after loading)',function(){
        var mp = ConfigurationService.mainPage();
        expect(mp).toBeDefined();
        expect(mp.title).toBe ('ABS dashboard');
    })
})