(function() {
    var app = angular.module('app');
    
    app.controller('AppController', ['$location', 'routeChecker', 'tokenStorage', function($location, routeChecker, tokenStorage) {  
       
        var model = this;

        var instancia = routeChecker();
        
        model.isPrivate = function () {
            return instancia.isPrivate();
        }
        model.isActive = function (path) {
            return instancia.isActive(path);
        }
        model.logout = function (){
            tokenStorage.clearToken();
            $location.path("/");
            return false;
        };

    }]);
})();