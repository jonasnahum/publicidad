(function() {
    var app = angular.module('app');
    app.controller('TodosUsuariosController', ['$location', 'usuariosProxy', 'tokenStorage', function($location, usuariosProxy, tokenStorage) {
        var ctrl = this;
        ctrl.searchText = "";

        ctrl.usuarios = [];
        ctrl.emailUsuario = "";
        

        ctrl.getAll = function(){
            usuariosProxy.getAll(function(data){
                ctrl.usuarios=data;
            });
        };
        ctrl.getAll();
        ctrl.delete = function (id) {
            usuariosProxy.delete(id,function(){
               $location.path('/privado/todos/usuarios');
            });
        };
        ctrl.getEmail = function (){
            ctrl.emailUsuario = tokenStorage.getEmail();
        };
        ctrl.getEmail();
        
    }]);
})();