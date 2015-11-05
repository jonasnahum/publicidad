(function () {
    var app = angular.module('app', ['ngRoute']);
    
    app.config(["$routeProvider", function ($router) { 
            
        $router.when("/", { templateUrl: "angular/views/guardar.html" })
        .when('/ver', { templateUrl:
                              "angular/views/ver.html" })
        .otherwise({ redirectTo: "/" });        
    }]);
})();