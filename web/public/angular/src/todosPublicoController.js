(function() {
    var app = angular.module('app');
    app.controller('TodosPublicoController', ['paginasProxy', '$anchorScroll', '$location', 'mapFactory', function(paginasProxy, $anchorScroll, $location, mapFactory) {
        
        var ctrl = this;
        ctrl.paginas = [];
        ctrl.searchText = "";
        //ctrl.requestedPageNumber;
        //ctrl.myPageItemsCount = 4;

        ctrl.scrollTo = function(id) {
           $location.hash(id);
           $anchorScroll();
        };
        
        
        ctrl.getAll = function(){
            paginasProxy.getAll(function(data){
                ctrl.paginas=data;
                
                var latitud = parseFloat(19.412288699925995);
                var longitud = parseFloat(-102.0718502998352);
                var mapa = mapFactory(latitud,longitud);
                mapa.placeMarker(latitud,longitud);
            });
        };
        ctrl.getAll();  
        
    }]);
})();