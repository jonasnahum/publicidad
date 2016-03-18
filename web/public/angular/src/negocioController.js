(function() {
    var app = angular.module('app');
    var depArr = ['$routeParams', '$location', 'mapFactory', 'modelFactory', 'paginasProxy', '$anchorScroll'];
    
    depArr.push(function($route, $location, mapFactory, modelFactory, paginasProxy,  $anchorScroll) {
        var ctrl = this;
        ctrl.scrollTo = function(id) {
           $location.hash(id);
           $anchorScroll();
        };
        ctrl.negocio= $route.negocio;
        var modelInstance = modelFactory();
        
        ctrl.getOne = function (name, userId) {
           paginasProxy.getByUniqueName(name, function(data){
                var obj = modelInstance.getObjFromSubdocument(data[0]);
                ctrl = modelInstance.copyObjToCtrl(obj,ctrl);
               
                var latitud = parseFloat(ctrl.lat);
                var longitud = parseFloat(ctrl.long);

                var mapa = mapFactory(latitud,longitud);
                mapa.placeMarker(latitud,longitud);
            });
        };
        ctrl.getOne(ctrl.negocio);
    });
    app.controller('NegocioController', depArr);
})();