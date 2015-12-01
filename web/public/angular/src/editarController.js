(function() {
    var app = angular.module('app');
    

    app.controller('EditarFormularioController', ['Upload', '$http', '$routeParams', '$location', 'mapService', 'productosService', 'uploadFilesService', 'modelFactory', function(Upload, $http, $route, $location, mapService, productosService, uploadFilesService, modelFactory) {
        var ctrl = this;
        
        ctrl.empresaId= $route.id;
        
        ctrl.nombre = undefined;
        ctrl.logotipo = undefined;
        ctrl.foto = undefined;
        ctrl.textoIntro = undefined;
        ctrl.numero = undefined;
        ctrl.numeroInt = undefined;
        ctrl.calle = undefined;
        ctrl.colonia = undefined;
        ctrl.cp = undefined;
        ctrl.municipio = undefined;
        ctrl.estado = undefined;
        ctrl.lat = undefined;
        ctrl.long = undefined;
        ctrl.rubro = undefined;
        ctrl.descripcion = undefined;
        ctrl.horario = undefined;
        ctrl.encargado = undefined;
        ctrl.tel = undefined;
        ctrl.face = undefined;
        ctrl.email = undefined;
        ctrl.productos = [];
        ctrl.nota = undefined;
        ctrl.noContrato = undefined;
        ctrl.url = undefined;
        ctrl.cliente = undefined;
        ctrl.telCliente = undefined;
        ctrl.correoCliente = undefined;
        ctrl.fechaContrato = undefined;//date
        ctrl.fechaVencimiento = undefined;//date
        ctrl.pago = undefined;
        ctrl.mapa = undefined;
        
        var modelInstance = modelFactory();
        
        //UPLOAD IMAGES Function
        ctrl.uploadFiles = function (files, errFiles, propertyName) {
            var up = uploadFilesService();
            ctrl.files = files;
            ctrl.errFiles = errFiles && errFiles[0];
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

        var promise1 = function() {
            return $http({
                url: 'http://localhost:3000/empresas/api/' + ctrl.empresaId,
                method: "GET",
            }).success(function(data, status, headers, config){
                var obj = modelInstance.getObjFromSubdocument(data);
                ctrl = modelInstance.copyObjToCtrl(obj,ctrl);
                
                var latitud = parseFloat(ctrl.lat);
                var longitud = parseFloat(ctrl.long);
                
                ctrl.mapa = mapService(latitud,longitud);
                ctrl.mapa.placeMarker(latitud,longitud);
                ctrl.mapa.getEventListener();
                
            }).error(function(data, status, headers, config) {
                console.log("%s %s %s", data, status, config);    
            });
        };
        promise1();
        ctrl.borrarMarker = function () {
            ctrl.mapa.borrarMarker();
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
        
        ctrl.editar = function(){ 
            ctrl.lat = ctrl.mapa.getLat();
            ctrl.long = ctrl.mapa.getLong();
            $http({
                url: 'http://localhost:3000/empresas/api/' + ctrl.empresaId,
                method: "PUT",
                data:modelInstance.getModelFromCtrl(ctrl)
            }).success(function(data, status, headers, config){
                alert("Info enviada");
                $location.path('/todos');
            }).error(function(data, status, headers, config) {
                alert("UPS there's an error");
                console.log("%s %s", status, data);
                
            });
        };

    }]);
})();
