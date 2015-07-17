describe('Test app core',function(){
    it('Should have test',function(){
        expect(true).toEqual(true);
    });

    it('Should be commangular group of constants defined',function(){
        expect(ACTIONS_EVENTS).toBeDefined();
        expect(ACTIONS_EVENTS_PARA).toBeDefined();
        expect(ACTIONS_COMMANDS).toBeDefined();

    })

    it('Should be commangular single constant defined',function(){
        expect(COM_ALERT_BOX).toBeDefined();
    })

})