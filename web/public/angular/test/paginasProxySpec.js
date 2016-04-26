
describe('paginasProxy test', function() {
    var url = 'http://localhost:3000/paginaWeb/api/';
    
    beforeEach(module('app'));
    
    it('create an instance', inject(function (paginasProxy) {
        expect(paginasProxy.url).toEqual(url);
    }));
    
});