(function() {
    var app = angular.module('app');
    
    app.controller('ProductosController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        
        ctrl.nombre = undefined;
       
        ctrl.save = function() {
            console.dir(ctrl);
            $http({
                url: '/miEmpresa',
                method: "POST",
                data: ctrl
            }).success(function(data, status, headers, config){
                $location.path('/');
            }).error(function(data, status, headers, config) {
                console.log(status);
                
            });
        };        
        
    }]);
    
})();