(function () {
    var app = angular.module('app', ['ngRoute', 'ngFileUpload']);
    
    app.config(["$routeProvider", function ($router) {

        $router.when("/", { templateUrl: "angular/views/index.html"})
        $router.when("/capturar", { templateUrl: "angular/views/capturar.html"})
        $router.when("/imagen", { templateUrl: "angular/views/imagen.html"})
        $router.when("/myEmpresa", { templateUrl: "angular/views/empresa.html"})
        .otherwise({ redirectTo: "/" });
    }]);
    
})();