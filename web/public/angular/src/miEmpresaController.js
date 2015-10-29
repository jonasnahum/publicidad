(function () {
    var app = angular.module('app');
        

    app.controller('MiEmpresaController', ['$http', '$location', function($http, $location){
        var model = this;
        model.body = undefined;
        
        $http.get('/miEmpresa').success(function (data) {
            model.body = data;
        });

    }]);
})();
