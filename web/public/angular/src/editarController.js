(function() {
    var app = angular.module('app');
    

    app.controller('EditarFormularioController', ['Upload', '$timeout', '$http', '$routeParams', '$location', 'mapService', 'productosService', 'modelFactory', function(Upload, $timeout, $http, $route, $location, mapService, productosService, modelFactory) {
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
        
        //UPLOAD IMAGES Function
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
                    alert("imagen serializada")
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
        

        var promise1 = function() {
            return $http({
                url: 'http://localhost:3000/empresas/api/' + ctrl.empresaId,
                method: "GET",
            }).success(function(data, status, headers, config){
                ctrl.nombre = data.nombre;
                ctrl.logotipo = data.logotipo;
                ctrl.foto = data.foto;
                ctrl.textoIntro = data.textoIntro;
                ctrl.lat = data.lat;
                ctrl.long = data.long;
                ctrl.descripcion = data.descripcion;
                ctrl.horario = data.horario;
                ctrl.encargado = data.encargado;
                ctrl.tel = data.tel;
                ctrl.face = data.face;
                ctrl.email = data.email;
                ctrl.productos = data.productos;
                ctrl.nota = data.nota;
                
                ctrl.numero = data.direccion.numero;
                ctrl.numeroInt = data.direccion.numeroInt;
                ctrl.calle = data.direccion.calle;
                ctrl.colonia = data.direccion.colonia;
                ctrl.cp = data.direccion.cp;
                ctrl.municipio = data.direccion.municipio;
                ctrl.estado = data.direccion.estado;
          
                ctrl.rubro = data.rubro.rubro;
                
                ctrl.noContrato = data.informacion.noContrato;
                ctrl.url = data.informacion.url;
                ctrl.cliente = data.informacion.cliente;
                ctrl.telCliente = data.informacion.telCliente;
                ctrl.correoCliente = data.informacion.correoCliente;
                ctrl.fechaContrato = data.informacion.fechaContrato;
                ctrl.fechaVencimiento = data.informacion.fechaVencimiento;
                ctrl.pago = data.informacion.pago;
                
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
                data:{
                    nombre:ctrl.nombre,
                    logotipo:ctrl.logotipo,
                    foto:ctrl.foto,            
                    textoIntro:ctrl.textoIntro,
                    lat: ctrl.lat,
                    long: ctrl.long,
                    long:ctrl.long,
                    descripcion:ctrl.descripcion,
                    horario:ctrl.horario,
                    encargado:ctrl.encargado,
                    tel:ctrl.tel,
                    face:ctrl.face,
                    email:ctrl.email,
                    productos:ctrl.productos,
                    nota:ctrl.nota,
                    numero:ctrl.numero,
                    numeroInt:ctrl.numeroInt,
                    calle:ctrl.calle,
                    colonia:ctrl.colonia,
                    cp:ctrl.cp,
                    municipio:ctrl.municipio,
                    estado:ctrl.estado,
                    rubro:ctrl.rubro,
                    noContrato:ctrl.noContrato,
                    url:ctrl.url,
                    cliente:ctrl.cliente,
                    telCliente:ctrl.telCliente,
                    correoCliente:ctrl.correoCliente,
                    pago:ctrl.pago
                }
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
