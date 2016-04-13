(function () {
    var app = angular.module('app', ['ngRoute', 'ngMessages', 'angularUtils.directives.dirPagination']);
    
    app.config(["$routeProvider", "$httpProvider", function ($router, $httpProvider) {
        
        $httpProvider.interceptors.push('httpInterceptor');
//publico
        $router.when("/", { templateUrl: "angular/views/todosPublico.html"})
        $router.when('/signin', { templateUrl: "angular/views/signin.html" })
        $router.when('/signup', { templateUrl: "angular/views/signup.html" })
        $router.when("/:negocio", { templateUrl: "angular/views/negocio.html" })
        //$router.when("/:negocio", { templateUrl: "angular/views/negocio2.html" })
        $router.when("/publico/about", { templateUrl: "angular/views/about.html" })
        $router.when("/publico/contact", { templateUrl: "angular/views/contact.html" })
        $router.when("/error", { templateUrl: "angular/views/error.html" })
        $router.when("/publico/nuevo/:id", { templateUrl: "angular/views/nuevoPublico.html" })
        $router.when("/publico/signup", { templateUrl: "angular/views/signupPublico.html" })
//privado
        $router.when("/privado/ver/:id", 
                     { templateUrl: "angular/views/ver.html"})
        $router.when("/privado/todos", 
                     { templateUrl: "angular/views/todos.html"})
        $router.when('/privado/editar/:id', 
                     { templateUrl: "angular/views/editar.html" })
        .otherwise({ redirectTo: "/" });
    }]);
    
})();