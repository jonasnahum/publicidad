(function () {
    var app = angular.module('app', ['ngRoute', 'ngFileUpload', 'ngMessages']);
    
    app.config(["$routeProvider", function ($router) {

        $router.when("/", { templateUrl: "angular/views/index.html"})
        $router.when("/imagen", { templateUrl: "angular/views/imagen.html"})
        $router.when("/correo", { templateUrl: "angular/views/correo.html"})
        $router.when("/verimagen", 
                     { templateUrl: "angular/views/verImagen.html"})
        $router.when("/formulario", 
                     { templateUrl: "angular/views/formulario.html"})
        $router.when("/verformulario", 
                     { templateUrl: "angular/views/verformulario.html"})
        $router.when("/validation", 
                     { templateUrl: "angular/views/validate.html"})
        .otherwise({ redirectTo: "/" });
    }]);
    
})();