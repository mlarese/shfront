describe('Configuration of commangular instance (dispatch) ',function(){
    var provider,scope,injector,$timeout,$log;
    beforeEach(function() {
        module('commangular', function($commangularProvider) {
            provider = $commangularProvider;
        });

        inject(function(_$timeout_,$rootScope, $injector,_$log_){
            scope = $rootScope.$new();
            injector = $injector;
            $timeout = _$timeout_;
            $log=_$log_;

        });
    });

    it('scope should be defined',function(){
       expect(scope).toBeDefined();
    })
    it('injector should be defined',function(){
        expect(injector).toBeDefined();
    })
    it('provider should be defined',function(){
        expect(provider).toBeDefined();
    })

    it('scope.dispatcher should be defined',function(){
        expect(scope.dispatch).toBeDefined();
    })
})