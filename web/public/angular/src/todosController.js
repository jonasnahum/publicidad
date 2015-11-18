(function() {
    var app = angular.module('app');
    app.controller('TodosController', ['$http', '$location', function($http, $location) {

        var ctrl = this;

        var url = 'http://localhost:3000/empresas/api/';
        ctrl.empresas = [];

        
        ctrl.getAll = function(){
            $http({
                    method: 'GET',
                    url: url,
                }).success(function(data){
                ctrl.empresas=data;
            }).error(function(err){
                alert(err);
            });
        };
        
        ctrl.getAll();

        ctrl.delete = function (id) {
            $http({
                method: "DELETE",
                url: url + id
            }).success(function(){
               $location.path('/todos');
            }).error(function(err){
            alert(err);
            });
        }
    }]);
})();