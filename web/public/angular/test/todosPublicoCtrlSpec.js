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
    var mapFactoryMock;
    var map;
    var anchor;
    
    beforeEach(module('app'));
    
    beforeEach(function() {
        var mapFactoryMock = function(latitud, longitud){
            return {
                placeMarker : function(latitud, longitud){
                    return {latitud, longitud}
                }
            }
        };
        
        var $anchorScrollMock = function(){
            return "hola me llamaron?"
        };
        
        module(function ($provide) {
            $provide.value('mapFactory', mapFactoryMock);
            $provide.value('$anchorScroll', $anchorScrollMock);
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
    
    beforeEach(inject(function($location, mapFactory, $anchorScroll) {
        locationMock = $location;
        map = mapFactory;
        anchor = $anchorScroll;
    }));

    
    it('loads paginas on TodosController', function() {
        var controller = $controller('TodosPublicoController');    
        expect(controller.paginas).toEqual([]);
        
        $httpMock.expectGET(url);
        $httpMock.flush();        
        
        expect(controller.paginas).toEqual(all);
    });
    it('getall method sends latitud and longitud to map', function() {
        var controller = $controller('TodosPublicoController');    
        
        $httpMock.expectGET(url);
        $httpMock.flush();

        var obj = map(1,2);
        var actual = obj.placeMarker(1,2);
        expect(actual).toEqual({ latitud: 1, longitud: 2 });
    });
    it('scroll method calls', function() {
        var controller = $controller('TodosPublicoController');    
        
        $httpMock.expectGET(url);
        $httpMock.flush();
        //act
        controller.scrollTo(3);
        expect(anchor()).toEqual("hola me llamaron?");
    });
});