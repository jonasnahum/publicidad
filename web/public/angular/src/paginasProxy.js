(function() {
    var app = angular.module('app');
    
    app.factory('paginasProxy', ['proxyFactory', 'constants', function(proxyFactory, constants) {
        //la variable constante contiene : { server: process.env.SERVER || 'http://localhost:3000' }.
        var proxy = proxyFactory( constants.server + '/paginaWeb/api/');
        return proxy;     
    }]);
})();