(function() {
    var app = angular.module('app');
    
    app.controller('DireccionController', ['Upload', '$timeout', '$http', '$location', function(Upload, $timeout, $http, $location) {
        var ctrl = this;
        ctrl.numero = undefined;
        ctrl.numeroInt = undefined;
        ctrl.calle = undefined;
        ctrl.colonia = undefined;
        ctrl.cp = undefined;
        ctrl.municipio = undefined;
        ctrl.estado = undefined;
        ctrl.lat = undefined;
        ctrl.long = undefined;
        
        //MAP Functions
        function initialize(){
            var map;
            var myCenter=new google.maps.LatLng(19.4096,-102.0520);
            var markersArray = [];
            var mapOptions = {
                center:myCenter,
                zoom:13,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("googleMap"),mapOptions);
            google.maps.event.addListener(map, 'click', function(event) {
                clearOverlays();
                placeMarker(event.latLng);
                ctrl.lat = event.latLng.lat();
                ctrl.long = event.latLng.lng();
            });
            function clearOverlays() {
              for (var i = 0; i < markersArray.length; i++ ) {
               markersArray[i].setMap(null);
              }
            }
            function placeMarker(location) {
                var marker = new google.maps.Marker({
                    position: location,
                    map: map,
                });
                markersArray.push(marker);
                var infowindow = new google.maps.InfoWindow({
                    content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
                });
                infowindow.open(map,marker);
            }

        }
        initialize();
        
    }]);
})();