(function() {
    var app = angular.module('app');
    
    app.controller('IndexController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl.nombre = undefined;
        ctrl.logotipo = undefined;
        ctrl.foto = undefined;
        ctrl.textoIntroductorio = undefined;
        ctrl.numero = undefined;
        ctrl.numeroInt = undefined;
        ctrl.calle = undefined;
        ctrl.colonia = undefined;
        ctrl.cp = undefined;
        ctrl.municipio = undefined;
        ctrl.estado = undefined;
        ctrl.latitud = 0;
        ctrl.longitud = 0;
        
        ctrl.rubro = undefined;
        ctrl.descripcion = undefined;
        ctrl.horario = undefined;
        ctrl.encargado = undefined;
        ctrl.tel = undefined;
        ctrl.face = undefined;
        ctrl.email = undefined;
        ctrl.productos = [];
        ctrl.producto = undefined;
        ctrl.nota = undefined;
        ctrl.emailMercadoUruapan = undefined;
        ctrl.noDeContrato = undefined;
        ctrl.direcciondePaginaWeb = undefined;
        ctrl.nombreCliente = undefined;
        ctrl.telCliente = undefined;
        ctrl.correoCliente = undefined;
        ctrl.fechaContrato = undefined;
        ctrl.fechaVencimiento = undefined;
        ctrl.precio = undefined;
        
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
                ctrl.latitud = event.latLng.lat();
                ctrl.longitud = event.latLng.lng();
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
        
        
   
        ctrl.agregarProducto = function() {
           ctrl.productos.push(ctrl.producto);
           ctrl.producto = {};
        };   
        ctrl.save = function() {
            console.dir(ctrl);
            $http({
                url: '/miEmpresa',
                method: "POST",
                data: ctrl
            }).success(function(data, status, headers, config){
                $location.path('/');
            }).error(function(data, status, headers, config) {
                console.log(status);
                
            });
        };        
        
    }]);
    
})();