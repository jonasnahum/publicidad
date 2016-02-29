(function() {
    var app = angular.module('app');
    arrDep = ['$routeParams','$location', 'mapFactory', 'productosFactory', 'paginasProxy', 'tokenStorage', 'usuariosProxy']; 
    arrDep.push(function($route, $location, mapFactory, productosFactory, paginasProxy, tokenStorage, usuariosProxy) {
        
        var ctrl = this;
        ctrl.nombre = undefined;
        ctrl.colorBackground = undefined;
        ctrl.colorText = undefined;
        ctrl.logotipo = undefined;
        ctrl.foto = undefined;
        ctrl.textoIntro = undefined;
        ctrl.descripcion = undefined;
        ctrl.horario = undefined;
        ctrl.encargado = undefined;
        ctrl.tel = undefined;
        ctrl.face = undefined;
        ctrl.flickr = undefined;
        ctrl.whats = undefined;
        ctrl.link1 = undefined;
        ctrl.link2 = undefined;
        
        ctrl.email = undefined;
        ctrl.productos = [];
        ctrl.nota = undefined;
        //direccion 
        //rubro
        
        //Map Function
        var mapa = mapFactory();
        mapa.getEventListener();
        ctrl.borrarMarker = function () {
            mapa.borrarMarker();
        };
        
        ctrl.quitarLogo = function() {
            ctrl.logotipo = undefined;
        };
        ctrl.quitarFoto = function() {
            ctrl.foto = undefined;
        };
        
        var prod = productosFactory()
        ctrl.agregarProducto = function() {
            ctrl.producto = prod.agregarProducto(ctrl.productos, ctrl.producto);
        };
        ctrl.removerProducto = function() {
            ctrl.productos = prod.removerProducto(ctrl.productos, ctrl.remover);
        };        
        ctrl.borrarProductos = function() {
            ctrl.productos = prod.borrarProductos(ctrl.productos);
        };        
        
        
        //Server Call
        ctrl.save = function() {
            ctrl.lat = mapa.getLat();
            ctrl.long = mapa.getLong();
            ctrl.userId = $route.id;
            paginasProxy.savePublico(ctrl.userId, ctrl, function(data, status, headers, config){
                alert("Su página web esta registrada, ahora la puede buscar en nuestra lista de negocios. Gracias.");
                $location.path('/');
            });
        };
                //Server Call
        ctrl.noGuardar = function() {
            ctrl.userId = $route.id;
            usuariosProxy.delete(ctrl.userId, function(data, status, headers, config){
                alert("Todos sus datos tanto públicos como privados han sido borrados.");
                $location.path('/');
            });
        };  
    });
    app.controller('NuevoPublicoController', arrDep);
})();
