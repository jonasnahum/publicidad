describe('constants test', function() {
    var expected = 'http://localhost:3000';
    
    beforeEach(module('app'));
    
    it('get map method', inject(function (constants) {//inyecta mock debido a que esta sobreescrito en el karma.conf.js
        expect(constants.server).toEqual(expected);
    }));
});