(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$location', 'paginasProxy', 'tokenStorage', function($location, paginasProxy, tokenStorage) {
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
            paginasProxy.delete(id,function(){
               $location.path('/privado/todos');
            });
        };
        ctrl.getEmail = function (){
            ctrl.emailUsuario = tokenStorage.getEmail();
        };
        ctrl.getEmail();
        
    }]);
})();