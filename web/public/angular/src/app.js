(function () {
    var app = angular.module('app', ['ngRoute', 'ngFileUpload']);
    
    app.config(["$routeProvider", function ($router) {

        $router.when("/", { templateUrl: "angular/views/todos.html"})
        $router.when("/nuevo", 
                     { templateUrl: "angular/views/nuevo.html"})
        $router.when("/ver/:id", 
                     { templateUrl: "angular/views/ver.html"})
        $router.when("/todos", 
                     { templateUrl: "angular/views/todos.html"})
        $router.when('/editar/:id', 
                     { templateUrl: "angular/views/editar.html" })
        .otherwise({ redirectTo: "/" });
    }]);
    
})();