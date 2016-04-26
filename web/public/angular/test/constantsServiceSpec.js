//no permite utilizar el servicio constants, tiene que ser un mock, debido a $ jquery
//como hacer un mock en un archivo y usarlo en varios test.

describe('constants test', function() {
    var expected = 'http://localhost:3000';
    var facto;
    beforeEach(module('app'));
    it('create an instance', inject(function (constants) {//inyecta mock debido a que esta sobreescrito en el karma.conf.js
        expect(constants.server).toEqual(expected);
    }));
});