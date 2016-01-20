(function() {
    var app = angular.module('app');
    var depArr = ['$location', 'mapFactory'];
    
    depArr.push(function($location, mapFactory) {
        var ctrl = this; 
        ctrl.latitud = 19.412288699925995;
        ctrl.longitud = -102.0718502998352;
        
        ctrl.getMap = function () {
            var mapa = mapFactory(ctrl.latitud,ctrl.longitud);
            mapa.placeMarker(ctrl.latitud,ctrl.longitud);   
        };
        
        ctrl.getMap();
    });
    app.controller('AboutController', depArr);
})();