(function() {
    var app = angular.module('app');
    app.controller('TodosPublicoController', ['$http', '$location', 'empresasProxy', 'tokenStorage', function($http, $location, empresasProxy, tokenStorage) {
        var ctrl = this;
        ctrl.empresas = [];
        ctrl.searchText = "";

        ctrl.getAll = function(){
            empresasProxy.getAll(function(data){
                ctrl.empresas=data;
            });
        };
        ctrl.getAll();  
        
    }]);
})();