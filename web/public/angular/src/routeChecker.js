(function() {
    var app = angular.module('app');
    
    app.factory('routeChecker', ['$location',function($location) {
        var RouteChecker = function() {
            this.privatePages = ['/privado/todos', '/privado/nuevo', '/privado/editar', '/privado/ver'];
            this.url = "";
        };
        RouteChecker.prototype.isPrivate = function () {
            this.url = $location.path();
            
            for (i = 0; i < this.privatePages.length ; i++){
                if(this.url.indexOf(i) > -1)
                    return true;
            }
            return false;

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