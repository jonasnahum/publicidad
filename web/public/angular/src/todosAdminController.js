(function() {
    var app = angular.module('app');
    app.controller('TodosAdminController', ['$location', 'adminsProxy', 'tokenStorage', function($location, adminsProxy, tokenStorage) {
        var ctrl = this;
        ctrl.searchText = "";

        ctrl.admins = [];
        
        ctrl.getAll = function(){
            adminsProxy.getAll(function(data){
                ctrl.admins = data;
            });
        };
        ctrl.getAll();
        ctrl.delete = function (id) {
            adminsProxy.delete(id, function() {
               $location.path('/privado/todos/admin');
            });
        };
        
        
    }]);
})();