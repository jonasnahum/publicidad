(function() {
    var app = angular.module('app');
    
    app.controller('FormularioController', ['Upload', '$timeout', '$http', '$location', function(Upload, $timeout, $http, $location) {
        var ctrl = this;
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
        
        //MAP Functions
        var map;
        var myCenter=new google.maps.LatLng(19.4096,-102.0520);

        function initialize(){
            var mapOptions = {
                center:myCenter,
                zoom:13,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
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
        google.maps.event.addDomListener(window, 'load', initialize);

        
        //Productos Function
        ctrl.agregarProducto = function() {
            ctrl.productos.push(ctrl.producto);
            ctrl.producto = {};
        };
        
        //SERVER Functions
        //http://localhost:3000/empresas/api/
        ctrl.save = function() {
            //console.dir(ctrl.productos);
            console.dir(ctrl);
            $http({
                url: 'http://localhost:3000/empresas/api/',
                method: "POST",
                data: ctrl
            }).success(function(data, status, headers, config){
                alert("Info enviada");
                $location.path('/');
            }).error(function(data, status, headers, config) {
                alert("UPS there's an error");
                console.log("%s %s", status, data);
                
            });
        };
        
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
