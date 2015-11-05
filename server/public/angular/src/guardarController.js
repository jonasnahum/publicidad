(function() {
    var app = angular.module('app');
   
    app.controller('GuardarController', [function() {
        var ctrl = this;
        
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
    }]); 
})();
