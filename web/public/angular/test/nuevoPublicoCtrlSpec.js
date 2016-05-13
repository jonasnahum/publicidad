describe("nuevo controller", function(){
    var url = 'http://localhost:3000/paginaWeb/api/undefined';
    
    beforeEach(module('app')); 
    
    var $controller; 
    var $httpMock; 
    var route; 
    
    var $locationCaptured; 
    var mapa;
    var prod;
    var paginasProx;
    var usuariosProx;
    var link;
    
    beforeEach(function() {
      module(function ($provide) {//porque dice que google no existe
            $provide.value('$window', windowMock);
        });
    });

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($routeParams,$location, mapFactory, productosFactory, paginasProxy, usuariosProxy,linkFactory) {
        route = $routeParams;
        $locationCaptured = $location;
        mapa = mapFactory;
        prod = productosFactory();
        paginasProx = paginasProxy;
        usuariosProxy = usuariosProxy;
        link = linkFactory();
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('POST', url).respond(false);
    }));
    
    it('borrar maker', function() {
        var controller = $controller('NuevoPublicoController');
        spyOn(controller, "borrarMarker");
        controller.borrarMarker();
        expect(controller.borrarMarker).toHaveBeenCalled();        
    });
    
    it('quitar logo', function() {
        var controller = $controller('NuevoPublicoController');
        controller.logotipo = "jonas";
        controller.quitarLogo();
        expect(controller.logotipo).toBe(undefined);
    });
    
    it('quitar foto', function() {
        var controller = $controller('NuevoPublicoController');
        controller.foto = "jonas";
        controller.quitarFoto();
        expect(controller.foto).toBe(undefined);
    });
    
    it('agregar producto', function() {
        var controller = $controller('NuevoPublicoController');
        var productos = [{texto:"hola"}];
        var producto = 3;
        controller.productos= productos;
        controller.producto= producto;
        
        spyOn(controller, "agregarProducto");
        
        controller.agregarProducto();
        expect(controller.agregarProducto).toHaveBeenCalled();
    });
    
    it('remover producto', function() {
        var controller = $controller('NuevoPublicoController');
        var productos = [{texto:"hola"}];
        var remover = 3;
        controller.productos= productos;
        controller.remover= remover;
        spyOn(controller, "removerProducto");
        controller.removerProducto();
        expect(controller.removerProducto).toHaveBeenCalled();
    });
    
    //este es un metodo ejemplar, ver como funciona y si se puede replicar.
    it('borrar productos', function() {
        var controller = $controller('NuevoPublicoController');
        var productos = [{texto:"hola"}];
        controller.productos= productos;
        spyOn(controller, "borrarProductos").and.callThrough();
        spyOn(prod, "borrarProductos").and.returnValue([]);
        controller.borrarProductos();
        expect(controller.borrarProductos).toHaveBeenCalled();
        expect(controller.productos).toEqual([]);
    });
    it('agregar link', function() {
        var link1 = "link1";
        var link2 = "link2";
        var links = [link1];
        var controller = $controller('NuevoPublicoController');
        spyOn(controller, "agregarLink");
        controller.agregarLink();
        expect(controller.agregarLink).toHaveBeenCalled();
    });
    it('remover link', function() {
        var controller = $controller('NuevoPublicoController');
        spyOn(controller, "removerLink").and.returnValue();
        controller.removerLink();
        expect(controller.removerLink).toHaveBeenCalled();
    });
    it('borrar links', function() {
        var controller = $controller('NuevoPublicoController');       
        spyOn(controller, "borrarLinks");
        controller.borrarLinks();
        expect(controller.borrarLinks).toHaveBeenCalled();
    });
    
    it('changes location on Save', function() {
        var controller = $controller('NuevoPublicoController');
        
        controller.save();
        
        $httpMock.expectPOST(url);
        $httpMock.flush();
        
        expect($locationCaptured.path()).toBe('/');
    });
    
});


