(function() {
    var app = angular.module('app');
    
    app.controller('EditarFormularioController', ['Upload', '$timeout', '$http', '$routeParams', '$location', function(Upload, $timeout, $http, $route, $location) {
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
                
                ctrl.initialize(latitud,longitud);
            }).error(function(data, status, headers, config) {
                console.log("%s %s %s", data, status, config);    
            });
        };

        promise1();
        var map;
        ctrl.initialize = function (latitud, longitud){
            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            var myMarkerPosition=new google.maps.LatLng(latitud,longitud);
           
            var myCenter=new google.maps.LatLng(latitud,longitud);
            var mapOptions = {
                  center:myCenter,
                  zoom:13,
                  mapTypeId:google.maps.MapTypeId.ROADMAP
              };
            map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);    
            var marker = new google.maps.Marker({
                position: myMarkerPosition,
                map: map,
                icon: iconBase + 'schools_maps.png'
            });
            google.maps.event.addListener(map, 'click', function(event) {
                placeMarker(event.latLng);
                ctrl.lat = event.latLng.lat();
                ctrl.long = event.latLng.lng();
            });
        }
        function placeMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
            });
                
            var infowindow = new google.maps.InfoWindow({
                content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
            });
            infowindow.open(map,marker);
            
        }

        
        ctrl.editar = function() {
            $http({
                url: 'http://localhost:3000/empresas/api/' + ctrl.empresaId,
                method: "PUT",
                data:{
                    nombre:ctrl.nombre,
                    logotipo:ctrl.logotipo,
                    foto:ctrl.foto,            
                    textoIntro:ctrl.textoIntro,
                    lat:ctrl.lat,
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
