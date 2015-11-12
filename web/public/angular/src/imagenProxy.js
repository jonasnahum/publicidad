(function() {
    var app = angular.module('app');
    
    app.factory('imagenProxy', ['proxyFactory', function(proxyFactory){
        var proxy = proxyFactory('/imagenes/api/');
        return proxy;
    }]);
})();