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
        
        //Productos functions
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
                alert("Info enviada");
                $location.path('/todos');
            }).error(function(data, status, headers, config) {
                alert("UPS there's an error");
                console.log("%s %s", status, data);
                
            });
        };
        
        //Upload images function
        ctrl.uploadFiles = function (files, errFiles, propertyName) {
            var up = uploadFilesService();
            var callback = function (response) {
                ctrl[propertyName] = response.data;
            };
            var error = function (response) {
                if (response.status > 0) {
                    ctrl.errorMsg = response.status + ': ' + response.data;
                }
            };
            var progres = function (evt) {
                ctrl.progress = 
                    Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            }
            up.upload(files, errFiles, propertyName, callback, error, progres);
        };
        
    }]);//end of the controller
})();
