(function() {
    var app = angular.module('app');
    
    app.controller('NuevoController', ['$http', '$location', 'mapService', 'productosService', 'uploadFilesService', function($http, $location, mapService, productosService, uploadFilesService) {
        
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
            ctrl.files = { [propertyName] : files };
            ctrl.errFiles = { [propertyName] : errFiles && errFiles[0] };
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
            $http({
                url: 'http://localhost:3000/empresas/api/',
                method: "POST",
                data: ctrl
            }).success(function(data, status, headers, config){
                $location.path('/todos');
            }).error(function(data, status, headers, config) {
                alert("UPS there's an error");
                console.log("%s %s", status, data);            
            });
        };
        
    }]);//end of the controller
})();
