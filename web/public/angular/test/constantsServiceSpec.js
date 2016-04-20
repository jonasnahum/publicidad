//no permite utilizar el servicio constants, tiene que ser un mock, debido a $ jquery
//como hacer un mock en un archivo y usarlo en varios test.
describe('constants test', function() {
    var expected = 'http://localhost:3000';
    var constantsMock;
    
    beforeEach(module('app'));
    
    beforeEach(function() {
        constantsMock = {
            server: 'http://localhost:3000'
        };
        
        module(function ($provide) {
            $provide.value('constants', constantsMock);
        });

    });
    
    it('create an instance', inject(function (constants) {
        expect(constants.server).toEqual(expected);
    }));
    
});