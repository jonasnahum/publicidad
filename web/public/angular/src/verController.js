(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'mapService', 'modelFactory', 'empresasProxy'];
    
    depArr.push(function($route, $location,mapService, modelFactory, empresasProxy) {
        var ctrl = this; 
        ctrl.empresaId= $route.id;
        var modelInstance = modelFactory();
        
        ctrl.getOne = function (id) {
            empresasProxy.getOne(id, function(data){
                var obj = modelInstance.getObjFromSubdocument(data);
                ctrl = modelInstance.copyObjToCtrl(obj,ctrl);
                
                var latitud = parseFloat(ctrl.lat);
                var longitud = parseFloat(ctrl.long);
    
                var mapa = mapService(latitud,longitud);
                mapa.placeMarker(latitud,longitud);
                
            });
        };
        
        ctrl.getOne(ctrl.empresaId);
    });
    app.controller('VerController', depArr);
})();
