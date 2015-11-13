(function() {
    var app = angular.module('app');
    
    app.controller('VerFormularioController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
      
        ctrl.empresaId= "5645e902713f97c11f50d3aa";
        ctrl.direccionId = "5645e906713f97c11f50d3ab";
        ctrl.rubroId = "5645e906713f97c11f50d3ac";
        ctrl.informacionId = "5645e906713f97c11f50d3ad";  
        
        ctrl.lat = undefined;  
        ctrl.long = undefined;  
        
        ctrl.verEmpresa = function() {
            $http({
                url: 'http://localhost:3000/empresas/api/' + ctrl.empresaId,
                method: "GET",
            }).success(function(data, status, headers, config){
                console.log(data.lat);
                console.log(data.long);
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
            }).error(function(data, status, headers, config) {
                console.log("%s %s %s", data, status, config);    
            });
        };
        
        ctrl.verDireccion = function() {
            $http({
                url: 'http://localhost:3000/direcciones/api/' + ctrl.direccionId,
                method: "GET",
            }).success(function(data, status, headers, config){
                ctrl.numero = data.numero;
                ctrl.numeroInt = data.numeroInt;
                ctrl.calle = data.calle;
                ctrl.colonia = data.colonia;
                ctrl.cp = data.cp;
                ctrl.municipio = data.municipio;
                ctrl.estado = data.estado;
            }).error(function(data, status, headers, config) {
                console.log("%s %s %s", data, status, config);    
            });
        };
        
        ctrl.verRubro = function() {
            $http({
                url: 'http://localhost:3000/rubros/api/' + ctrl.rubroId,
                method: "GET",
            }).success(function(data, status, headers, config){
                ctrl.rubro = data.rubro;
            }).error(function(data, status, headers, config) {
                console.log("%s %s %s", data, status, config);    
            });
        };
        
        ctrl.verInformacion = function() {
            $http({
                url: 'http://localhost:3000/informacion/api/' + ctrl.informacionId,
                method: "GET",
            }).success(function(data, status, headers, config){
                ctrl.noContrato = data.noContrato;
                ctrl.url = data.url;
                ctrl.cliente = data.cliente;
                ctrl.telCliente = data.telCliente;
                ctrl.correoCliente = data.correoCliente;
                ctrl.fechaContrato = data.fechaContrato;
                ctrl.fechaVencimiento = data.fechaVencimiento;
                ctrl.pago = data.pago;
            }).error(function(data, status, headers, config) {
                console.log("%s %s %s", data, status, config);    
            });
        };
                
        ctrl.verEmpresa();
        ctrl.verDireccion();
        ctrl.verRubro();
        ctrl.verInformacion();    
        
        console.log(ctrl.lat);//aparecen como undefined
        console.log(ctrl.long);
        
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        ctrl.latitud = ctrl.lat;
        ctrl.longitud = ctrl.long;
        var myMarkerPosition=new google.maps.LatLng(ctrl.latitud,ctrl.longitud);
       
        var map;
        var myCenter=new google.maps.LatLng(ctrl.lat,ctrl.long);

        function initialize(){
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
        }
               
        
        google.maps.event.addDomListener(window, 'load', initialize);
        
    }]);
})();

