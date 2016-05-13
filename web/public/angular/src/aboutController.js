(function() {
    var app = angular.module('app');
    var depArr = ['$location', 'mapFactory', '$anchorScroll'];
    
    depArr.push(function($location, mapFactory, $anchorScroll) {
        var ctrl = this;
        
        ctrl.scrollTo = function(id) {
           $location.hash(id);
           $anchorScroll();
        };
        
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