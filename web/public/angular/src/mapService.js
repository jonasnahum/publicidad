(function() {
    var app = angular.module('app');
    
    app.factory('mapService', ['$location',function($location) {//singleton.
        
        var MapClass = function() {
            this.map = undefined;
            this.lat = undefined;
            this.long = undefined;
            this.myCenter=new google.maps.LatLng(19.4096,-102.0520);
            this.markersArray = [];
            this.mapOptions = {
                center:this.myCenter,
                zoom:13,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(document.getElementById("googleMap"), this.mapOptions);
            var that = this;
            google.maps.event.addListener(this.map, 'click', function(event){ 
                var locationString = $location.path();
                var palabra = locationString.split("/")[1];
                if(palabra == "ver"){
                    return;
                }
                that.manageEvent(event);
            });
        };
        
        MapClass.prototype.manageEvent = function(event){
            var that = this;
            that.clearOverlays();//quitar del mapa markers anteriores.
            that.placeMarker(event.latLng.lat(), event.latLng.lng());//poner este marker.
            that.lat = event.latLng.lat();//guardar latitud.
            that.long = event.latLng.lng();
        };
        MapClass.prototype.clearOverlays = function () {
            var that = this;
            for (var i = 0; i < that.markersArray.length; i++ ) {
                that.markersArray[i].setMap(null);
            }
        };
        MapClass.prototype.placeMarker = function (latitud,longitud) {
            var that = this;
            var myMarkerPosition = undefined;
            if(latitud && longitud){
                this.myCenter =  new google.maps.LatLng(latitud,longitud);
                myMarkerPosition = new google.maps.LatLng(latitud,longitud);
            }else{
                this.myCenter =  new google.maps.LatLng(19.4096,-102.0520);;
            };
            var marker = new google.maps.Marker({
                position: myMarkerPosition,
                map: that.map,
            });
            that.markersArray.push(marker);
            /*var infowindow = new google.maps.InfoWindow({
                content: 'Latitude: ' + latitud + '<br>Longitude: ' + longitud
            });
            infowindow.open(that.map, marker);*/
        };
        MapClass.prototype.borrarMarker = function () {
            var that = this;
            that.clearOverlays();
            that.markersArray = [];
            that.lat = undefined;
            that.long = undefined;
        };

        MapClass.prototype.getLat = function () {
            var that = this;
            return that.lat;
        };
        MapClass.prototype.getLong = function () {
            var that = this;
            return that.long;
        };
        
        return function() {
            return new MapClass();
        };
        
    }]);
})();