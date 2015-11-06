(function() {
    var app = angular.module('app');
    
    app.controller('VerImagenController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        
        ctrl.id = "563d1147d22be9092b051f18";//"563cef40a8eed2aa24c67a80";//"563cef50a8eed2aa24c67a81"
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