describe("Todos admin controller", function(){
    var url = 'http://localhost:3000/admin/api/';
    var id = 10;
    var all = [
        { nombre: 'rodrigo', calificacion: 30, id: 10 },
        { nombre: 'jonas', calificacion: 29, id: 11 },
        { nombre: 'monse', calificacion: 20, id: 12 }
    ];
    var $controller;
    var $httpMock; 
    var locationMock; 
    
    beforeEach(module('app'));
        
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('GET', url).respond(all);
        $httpBackend.when('DELETE', url + id).respond(true);
    }));
    
    beforeEach(inject(function($location) {
        locationMock = $location;
    }));

    
    it('loads admins on TodosController', function() {
        var controller = $controller('TodosAdminController');    
        expect(controller.admins).toEqual([]);
        
        $httpMock.expectGET(url);
        $httpMock.flush();        
        
        expect(controller.admins).toEqual(all);
    });
    it('changes location on Delete', function() {
        var controller = $controller('TodosAdminController');  
        controller.delete(id);
        
        $httpMock.expectDELETE(url + id);
        $httpMock.flush();
        
        expect(locationMock.path()).toBe('/privado/todos/admin');
    });
});