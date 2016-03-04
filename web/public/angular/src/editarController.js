(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'mapFactory', 'productosFactory', 'modelFactory', 'paginasProxy'];  
    depArr.push(function($route, $location, mapFactory, productosFactory, modelFactory, paginasProxy) {
        var ctrl = this;
        
        ctrl.empresaId= $route.id;
       
        var prod = productosFactory();
        var modelInstance = modelFactory();
        

        var getOne = function(id) {
            paginasProxy.getOne(id, function(data, status, headers, config){
                var obj = modelInstance.getObjFromSubdocument(data);
                ctrl = modelInstance.copyObjToCtrl(obj,ctrl);
                
                var latitud = parseFloat(ctrl.lat);
                var longitud = parseFloat(ctrl.long);
                
                ctrl.mapa = mapFactory(latitud,longitud);
                ctrl.mapa.placeMarker(latitud,longitud);
                ctrl.mapa.getEventListener();
                
            });
        };
        getOne(ctrl.empresaId);
        
        ctrl.quitarLogo = function() {
            ctrl.logotipo = undefined;
        };
        ctrl.quitarFoto = function() {
            ctrl.foto = undefined;
        };
    
        ctrl.borrarMarker = function () {
            ctrl.mapa.borrarMarker();
        };
    
        ctrl.agregarProducto = function() {
            ctrl.producto = prod.agregarProducto(ctrl.productos, ctrl.producto);
        };
        ctrl.removerProducto = function() {
            ctrl.productos = prod.removerProducto(ctrl.productos, ctrl.remover);
        };
        ctrl.borrarProductos = function() {
            ctrl.productos = prod.borrarProductos(ctrl.productos);
        };
        
        ctrl.editar = function(){ 
            ctrl.lat = ctrl.mapa.getLat();
            ctrl.long = ctrl.mapa.getLong();
            paginasProxy.update(ctrl.empresaId, modelInstance.getModelFromCtrl(ctrl), function(data, status, headers, config){
                alert("Info enviada");
                $location.path('/privado/todos');
            });
            
        };
    });
    app.controller('EditarFormularioController', depArr); 
})();
