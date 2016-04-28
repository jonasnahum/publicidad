describe("nuevo controller", function(){
    var url = '/alumnos/api/';
    
    beforeEach(module('app')); 
    
    var $controller, $httpMock, $locationCaptured, mapa;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('POST', url).respond(false);
    }));
    
    beforeEach(inject(function($location, mapFactory) {
        $locationCaptured = $location;
        mapa = mapFactory
    }));
    
    /*
    it('borrar maker', function() {
        var controller = $controller('NuevoPublicoController');
        
        spyOn(mapa, "borrarMaker").and.callThrough();
        controller.borrarMarker();
        
        
        expect(mapa.borrarMaker).toHaveBeenCalled();
    });
    */
    /*
    it('quitar logo', function() {
        var controller = $controller('NuevoPublicoController');
        controller.logotipo = "jonas";
        controller.quitarLogo();
        expect(controller.logotipo).toBe(undefined);
    });

    */
/*    it('changes location on Save', function() {
        var controller = $controller('NuevoController');
        
        controller.guardar();
        
        $httpMock.expectPOST(url);
        $httpMock.flush();
        
        expect($locationCaptured.path()).toBe('/');
    });
    */
});


