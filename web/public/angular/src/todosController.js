(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$http', '$location', 'empresasProxy',  function($http, $location, empresasProxy) {
        var ctrl = this;

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
               $location.path('/todos');
            });
        };
    }]);
})();