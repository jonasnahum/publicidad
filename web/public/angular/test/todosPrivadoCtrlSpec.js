describe("Todos Privado controller", function(){
    var url = 'http://localhost:3000/paginaWeb/api/';
    var id = 10;
    var all = [
        { nombre: 'rodrigo', calificacion: 30, id: 10 },
        { nombre: 'jonas', calificacion: 29, id: 11 },
        { nombre: 'monse', calificacion: 20, id: 12 }
    ];
    
    beforeEach(module('app')); 
    
    var $controller, $httpMock, $locationCaptured, tokenStorage;
    
    beforeEach(function() {
        constantsMock = {
            server: 'http://localhost:3000'
        };
        
        module(function ($provide) {
            $provide.value('constants', constantsMock);
        }); 
    });

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('GET', url).respond(all);
        $httpBackend.when('DELETE', url + id).respond(true);
    }));
    
    beforeEach(inject(function($location, tokenStorage) {
        $locationCaptured = $location;
        tokenStorageCaptured = tokenStorage;
        
    }));
    
    it('loads paginas on TodosController', function() {
        var controller = $controller('TodosController');    
        expect(controller.empresas).toEqual([]);
        
        $httpMock.expectGET(url);
        $httpMock.flush();        
        
        expect(controller.empresas).toEqual(all);
    });
    
    it('changes location on Delete', function() {
        var controller = $controller('TodosController');
        
        controller.delete(id);
        
        $httpMock.expectDELETE(url + id);
        $httpMock.flush();
        
        expect($locationCaptured.path()).toBe('/privado/todos');
    });
    
    it('loads ctrl.emailUsuario on getEmail method', function() {
        //arragements
        var controller = $controller('TodosController');
        var email = "jonasnahum@gmail.com";
        var id = 31;
        var expected = {token: '123asd', user: { email: email, _id: id }};
        //act
        tokenStorageCaptured.setToken(expected);
        //test
        expect(controller.emailUsuario).toEqual(expected.user.email);
    });
    
});