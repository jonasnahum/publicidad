(function() {
    var app = angular.module('app');
    
    app.factory("usuariosProxy", ["proxyFactory", "constants", function(proxyFactory, constants) {
        var UsuariosProxy = function() {                   
            this.signinProxy = proxyFactory(constants.server + '/usuarios/api/signin');
            this.signupProxy = proxyFactory(constants.server + '/usuarios/api/signup');
        };
        
        UsuariosProxy.prototype.signin = function(model, success){
            this.signinProxy.save(model, success);
        };
        UsuariosProxy.prototype.signup = function(model, success){
            this.signupProxy.save(model, success);
        };
        
        return new UsuariosProxy();
    }]);
})();