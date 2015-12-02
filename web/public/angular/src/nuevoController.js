(function() {
    var app = angular.module('app');
    arrDep = ['$http', '$location', 'mapService', 'productosService', 'uploadFilesService', 'empresasProxy']; 
        arrDep.push(function($http, $location, mapService, productosService, uploadFilesService, empresasProxy) {
        
        var ctrl = this;
        ctrl.nombre = undefined;
        ctrl.logotipo = undefined;
        ctrl.foto = undefined;
        ctrl.textoIntro = undefined;
        ctrl.descripcion = undefined;
        ctrl.horario = undefined;
        ctrl.encargado = undefined;
        ctrl.tel = undefined;
        ctrl.face = undefined;
        ctrl.email = undefined;
        ctrl.productos = [];
        ctrl.nota = undefined;
        
        //Map Function
        var mapa = mapService();
        mapa.getEventListener();
        ctrl.borrarMarker = function () {
            mapa.borrarMarker();
        };
            
        //Upload images function
        ctrl.uploadFiles = function (files, errFiles, propertyName) {
            var up = uploadFilesService();
            ctrl.files = files;
            ctrl.errFiles = errFiles && errFiles[0];
            up.upload(files, errFiles, propertyName, ctrl);
        };
            
        var prod = productosService()
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
            empresasProxy.save(ctrl, function(data, status, headers, config){
                $location.path('/todos');
            });
        };  
    });
    app.controller('NuevoController', arrDep);
})();
