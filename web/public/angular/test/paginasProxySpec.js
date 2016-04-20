
describe('paginasProxy test', function() {
    var url = 'http://localhost:3000/paginaWeb/api/';
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
    
    it('create an instance', inject(function (paginasProxy) {
        expect(paginasProxy.url).toEqual(url);
    }));
    
});