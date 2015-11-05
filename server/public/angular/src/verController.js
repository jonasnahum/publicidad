(function() {
    var app = angular.module('app');
   
    app.controller('VerController', [function() {
        var ctrl = this;
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        ctrl.latitud = 19.4077;
        ctrl.longitud = -102.0642;
        var myMarkerPosition=new google.maps.LatLng(ctrl.latitud,ctrl.longitud);
        
        var map;
        var myCenter=new google.maps.LatLng(19.4096,-102.0520);

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



