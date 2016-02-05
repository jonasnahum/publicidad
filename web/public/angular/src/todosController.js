(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$http', '$location', 'empresasProxy', 'tokenStorage', function($http, $location, empresasProxy, tokenStorage) {
        var ctrl = this;
        ctrl.searchText = "";
        var url = 'http://localhost:3000/empresas/api/';
        ctrl.empresas = [];
        ctrl.emailUsuario = "";
        

        ctrl.getAll = function(){
            empresasProxy.getAll(function(data){
                ctrl.empresas=data;
            });
        };
        ctrl.getAll();
        
        ctrl.delete = function (id) {
            empresasProxy.delete(id,function(){
               $location.path('/privado/todos');
            });
        };
        ctrl.getEmail = function (){
            ctrl.emailUsuario = tokenStorage.getEmail();
        };
        ctrl.getEmail();
        
    }]);
})();