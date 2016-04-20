describe("Todos publico controller, todas las páginas", function(){
    var url = 'http://localhost:3000/paginaWeb/api/';
    var id = 10;
    var all = [
        { nombre: 'rodrigo', calificacion: 30, id: 10 },
        { nombre: 'jonas', calificacion: 29, id: 11 },
        { nombre: 'monse', calificacion: 20, id: 12 }
    ];
    var $controller;
    var $httpMock; 
    var $locationCaptured;
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
    
    
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('GET', url).respond(all);
       /* 
       $httpBackend.when('DELETE', url + id).respond(true);
       */
    }));
    
    beforeEach(inject(function($location) {
        $locationCaptured = $location;
    }));

    
    it('loads paginas on TodosController', function() {
        var controller = $controller('TodosPublicoController');    
        expect(controller.paginas).toEqual([]);
        
        $httpMock.expectGET(url);
        $httpMock.flush();        
        
        expect(controller.paginas).toEqual(all);
    });
    /*
    it('changes location on Delete', function() {
        var controller = $controller('TodosController');
        
        controller.delete(id);
        
        $httpMock.expectDELETE(url + id);
        $httpMock.flush();
        
        expect($locationCaptured.path()).toBe('/');
    });
    */
});