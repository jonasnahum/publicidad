(function() {
    var app = angular.module('app');
    arrDep = ['$routeParams','$location', 'mapFactory', 'productosFactory', 'paginasProxy', 'usuariosProxy', 'linkFactory']; 
    arrDep.push(function($route, $location, mapFactory, productosFactory, paginasProxy, usuariosProxy, linkFactory) {
        
        var ctrl = this;
        ctrl.productos = [];
        ctrl.links = [];
        
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
        
        var linkObj = linkFactory();
        ctrl.agregarLink = function() {
            ctrl.link = linkObj.agregarLink(ctrl.links, ctrl.link);
        };
        ctrl.removerLink = function() {
            ctrl.links = linkObj.removerLink(ctrl.links, ctrl.numLinkARemover);
        };
        ctrl.borrarLinks = function() {
            ctrl.links = linkObj.borrarLinks(ctrl.links);
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
