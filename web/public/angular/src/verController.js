(function() {
    var app = angular.module('app');
    
    app.controller('VerController', ['$http', '$routeParams', '$location', '$log', 'mapService', 'modelFactory', function($http, $route, $location, $log, mapService, modelFactory) {
        var ctrl = this; 
        ctrl.empresaId= $route.id;
        var modelInstance = modelFactory();
        
        ctrl.getOne = function (id) {
            $http({
                url: 'http://localhost:3000/empresas/api/' + id,
                method: "GET",
            }).success(function(data, status, headers, config){
                var obj = modelInstance.getObjFromSubdocument(data);
                ctrl = modelInstance.copyObjToCtrl(obj,ctrl);
                
                var latitud = parseFloat(ctrl.lat);
                var longitud = parseFloat(ctrl.long);
    
                var mapa = mapService(latitud,longitud);
                mapa.placeMarker(latitud,longitud);
                
            }).error(function(data, status, headers, config) {
                console.log("%s %s %s", data, status, config);    
            });
        };
        
        ctrl.getOne(ctrl.empresaId);
    }]);
})();
