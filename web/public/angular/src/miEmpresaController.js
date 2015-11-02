(function() {
    var app = angular.module('app');
    
    app.controller('ProductosController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl.nombre = undefined;
        //ctrl.logotipo = undefined;
        //ctrl.foto = undefined;
        ctrl.txtIntroductorio = undefined;
        ctrl.numero = undefined;
        ctrl.numInt = undefined;
        ctrl.calle = undefined;
        ctrl.colonia = undefined;
        ctrl.cp = undefined;
        ctrl.municipio = undefined;
        ctrl.estado = undefined;
        ctrl.latitud = 0;
        ctrl.longitud = 0;
        
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
        
        ctrl.rubro = undefined;
        ctrl.descripcion = undefined;
        ctrl.horario = undefined;
        ctrl.encargado = undefined;
        ctrl.telefono = undefined;
        ctrl.facebook = undefined;
        ctrl.email = undefined;
        ctrl.productos = [];
        ctrl.producto = {};
        //ctrl.titulo = undefined;
        //ctrl.parrafo = undefined;
        ctrl.nota = undefined;
        ctrl.emailMercadoUpn = undefined;
        ctrl.numContrato = undefined;
        ctrl.pagWebCliente = undefined;
        ctrl.nombreCte = undefined;
        ctrl.telefonoCte = undefined;
        ctrl.emailCte = undefined;
        ctrl.fechaContrato = undefined;
        ctrl.venceContrato = undefined;
        ctrl.precio = undefined;

        
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