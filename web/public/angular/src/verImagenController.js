(function() {
    var app = angular.module('app');
    
    app.controller('VerImagenController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        
        ctrl.id = "563bc13a04a92d1c1d8edf10";
        ctrl.imagen = undefined;

        ctrl.GetImagen = function() {
            $http({
                url: 'http://localhost:3000/imagenes/api/oneImagen/' + ctrl.id,
                method: "GET",
            }).success(function(data, status, headers, config){
                ctrl.imagen = data;
            }).error(function(data, status, headers, config) {
                console.log(status);    
            });
        };
        ctrl.GetImagen();
    }]);
})();