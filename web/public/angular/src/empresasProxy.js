(function() {
    var app = angular.module('app');
    
    app.factory('empresasProxy', ['proxyFactory', 'constants', function(proxyFactory, constants) {
        //la variable constante contiene : { server: process.env.SERVER || 'http://localhost:3000' }.
        var proxy = proxyFactory( constants.server + '/empresas/api/');
        return proxy;     
    }]);
})();