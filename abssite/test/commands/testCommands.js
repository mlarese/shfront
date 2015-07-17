/**
 * Created by mauro.larese on 17/07/2015.
 */
describe('Test command dispatcher',function(){
    var $commangular;
    beforeEach(module('apps'));

    it('Should have Test',function(){
        expect(true).toBe(true);
    })
    it('Should be comamangular defined',function(){
        expect(commangular).toBeDefined();
    })
    it('Should be angular.mock defined',function(){
        expect(angular.mock).toBeDefined();
    })

})