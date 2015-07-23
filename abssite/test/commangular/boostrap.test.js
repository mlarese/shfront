"use strict";
describe('Configuration of $commangular library',function(){
    var $commangular,
        dispatcher;
    beforeEach(module('app'));

    beforeEach(inject(function(_$commangular_){
        $commangular=_$commangular_;
    }));

    it('Should have Test',function(){
        expect(true).toBe(true);
    });

    it('Should be angular.mock defined',function(){
        expect(angular.mock).toBeDefined();
    });

    it('Should be comamangular defined',function(){
        expect(commangular).toBeDefined();
    });


    it('Should be $commangular defined',function(){
        expect($commangular).toBeDefined();
    });
    it('Should be dispatcher defined',function(){
        expect($commangular.dispatch).toBeDefined();
    });

})