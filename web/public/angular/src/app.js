(function () {
    var app = angular.module('app', ['ngRoute', 'ngFileUpload', 'ngMessages']);
    
    app.config(["$routeProvider", "$httpProvider", function ($router, $httpProvider) {
        
        $httpProvider.interceptors.push('httpInterceptor');
//publico
        $router.when("/", { templateUrl: "angular/views/portada.html"})
        $router.when('/signin', { templateUrl: "angular/views/signin.html" })
        $router.when('/signup', { templateUrl: "angular/views/signup.html" })
        $router.when("/todosPublico", { templateUrl: "angular/views/todosPublico.html"})
        $router.when("/negocio/:negocio", { templateUrl: "angular/views/negocio.html" })
        $router.when("/about", { templateUrl: "angular/views/about.html" })
        $router.when("/contact", { templateUrl: "angular/views/contact.html" })
        $router.when("/error", { templateUrl: "angular/views/error.html" })
//privado
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