(function() {
    var app = angular.module('app');
    app.controller('TodosPublicoController', ['$http', '$location', 'paginasProxy', 'tokenStorage', function($http, $location, paginasProxy, tokenStorage) {
        var ctrl = this;
        ctrl.paginas = [];
        ctrl.searchText = "";
        //ctrl.requestedPageNumber;
        //ctrl.myPageItemsCount = 4;

        ctrl.getAll = function(){
            paginasProxy.getAll(function(data){
                ctrl.paginas=data;
            });
        };
        ctrl.getAll();  
        
    }]);
})();