describe('usuarios proxy test', function() {
    var urlSignupProxyFactory = 'http://localhost:3000/usuario/api/';
    var $httpMock;
    var id = 10;
    
    beforeEach(module('app'));
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('POST', urlSignupProxyFactory).respond(true);
        $httpBackend.when('GET', urlSignupProxyFactory).respond(true);
        $httpBackend.when('DELETE', urlSignupProxyFactory + id).respond(true);
       
    }));
    
    it('create an instance for signup', inject(function (usuariosProxy) {
        expect(usuariosProxy.signupPublicoProxy.url).toEqual(urlSignupProxyFactory);
    }));
    it('signuṕ publico method responds when its called', inject(function (usuariosProxy) {
      
        usuariosProxy.signupPublico({nombre: "jonas"}, function(response){
            expect(response).toBe(true);
        })
        $httpMock.expectPOST(urlSignupProxyFactory);//post syncrono
        $httpMock.flush();    
    }));
    it('delete method responds when its called', inject(function (usuariosProxy) {
        usuariosProxy.delete(id,function(response){
            expect(response).toBe(true);
        });
        $httpMock.expect("DELETE",urlSignupProxyFactory + id);//get syncrono
        $httpMock.flush();    
    }));
});