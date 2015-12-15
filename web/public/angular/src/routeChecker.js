(function() {
    var app = angular.module('app');
    
    app.factory('routeChecker', ['$location',function($location) {
        var RouteChecker = function() {
            this.freeAccesPages = ['/', '/signin', '/signup', '/todosPublica', '/about', '/contact'];
            this.url = "";
        };
        RouteChecker.prototype.isPrivate = function () {
            this.url = $location.path();
            this.addFreePage("/negocio/");            
            if (this.freeAccesPages.indexOf(this.url) === -1) 
                return true;//si no lo encuentra es privado.
            return false;//si lo encuentra es público.
        };
        RouteChecker.prototype.addFreePage = function (page) {
            var casilla = this.url.indexOf(page);
            if(casilla == 0){
               this.freeAccesPages.push(this.url);
            };    
            return
        };
        RouteChecker.prototype.isActive = function (path) {
            return path === $location.path();
        };

        return function() {
            return new RouteChecker();
        };
        
    }]);
})();