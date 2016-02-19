(function() {
    var app = angular.module('app');
    app.controller('TodosPublicoController', ['$http', '$location', 'empresasProxy', 'tokenStorage', function($http, $location, empresasProxy, tokenStorage) {
        var ctrl = this;
        ctrl.empresas = [];
        ctrl.searchText = "";
        //ctrl.requestedPageNumber;
        //ctrl.myPageItemsCount = 4;

        ctrl.getAll = function(){
            empresasProxy.getAll(function(data){
                console.log("GET ALL EMPRESAS PROxy");
                ctrl.empresas=data;
            });
        };
        ctrl.getAll();  
        
    }]);
})();