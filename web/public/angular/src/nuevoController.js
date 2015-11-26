(function() {
    var app = angular.module('app');
    
    app.controller('NuevoController', ['Upload', '$timeout', '$http', '$location', 'mapService',  function(Upload, $timeout, $http, $location, mapService) {
        
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
        
        ctrl.borrarMarker = function () {
            mapa.borrarEnMapaEnArrYEnProperties();
        };
        
        //Productos functions
        ctrl.remover = undefined;
        function sonDiferentes(element, index, array) {
            return element.titulo !== ctrl.remover;
        }
        
        ctrl.removerProducto = function(){
            ctrl.productos = ctrl.productos.filter(sonDiferentes);
        };
                     
        ctrl.agregarProducto = function() {
            if(ctrl.producto){
                ctrl.productos.push(ctrl.producto);
                ctrl.producto = undefined;
            }
        };
        
        ctrl.borrarProductos = function(){
            ctrl.productos = [];
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
            ctrl.files = files;
            ctrl.errFile = errFiles && errFiles[0];
            if (files && files.length) {
                Upload.upload({
                    url: 'http://localhost:3000/imagenes/api/post',
                    data: {
                        files: files
                    }
                }).then(function (response) {
                    ctrl[propertyName] = response.data;
                }, function (response) {
                    if (response.status > 0) {
                        ctrl.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    ctrl.progress = 
                        Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        };       
        
    }]);//end of the controller
})();
