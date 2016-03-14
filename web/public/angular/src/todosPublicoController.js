(function() {
    var app = angular.module('app');
    app.controller('TodosPublicoController', ['paginasProxy', '$anchorScroll', '$location', function(paginasProxy, $anchorScroll, $location) {
        
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
            });
        };
        ctrl.getAll();  
        
    }]);
})();