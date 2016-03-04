(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'mapFactory', 'modelFactory', 'paginasProxy'];
    
    depArr.push(function($route, $location, mapFactory, modelFactory, paginasProxy) {
        var ctrl = this; 
        ctrl.empresaId= $route.id;
        var modelInstance = modelFactory();
        
        ctrl.getOne = function (id) {
            paginasProxy.getOne(id, function(data){
                var obj = modelInstance.getObjFromSubdocument(data);
                ctrl = modelInstance.copyObjToCtrl(obj,ctrl);
                
                var latitud = parseFloat(ctrl.lat);
                var longitud = parseFloat(ctrl.long);
    
                var mapa = mapFactory(latitud,longitud);
                mapa.placeMarker(latitud,longitud);
                
            });
        };
        
        ctrl.getOne(ctrl.empresaId);
    });
    app.controller('VerController', depArr);
})();
