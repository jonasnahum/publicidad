(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$http', '$location', 'paginasProxy', 'tokenStorage', function($http, $location, paginasProxy, tokenStorage) {
        var ctrl = this;
        ctrl.searchText = "";
        
        ctrl.empresas = [];
        ctrl.emailUsuario = "";
        

        ctrl.getAll = function(){
            paginasProxy.getAll(function(data){
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