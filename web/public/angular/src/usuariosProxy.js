(function() {
    var app = angular.module('app');
    
    app.factory("usuariosProxy", ["proxyFactory", "constants", function(proxyFactory, constants) {
        var UsuariosProxy = function() {                   
            this.signinProxy = proxyFactory(constants.server + '/usuarios/api/signin');
            this.signupProxy = proxyFactory(constants.server + '/usuarios/api/signup');
            this.signupPublicoProxy = proxyFactory(constants.server + '/usuarios/api/signupPublico');
        };
        
        UsuariosProxy.prototype.signin = function(model, success){
            this.signinProxy.save(model, success);
        };
        UsuariosProxy.prototype.signup = function(model, success){
            this.signupProxy.save(model, success);
        };
        UsuariosProxy.prototype.signupPublico = function(model, success){
            this.signupPublicoProxy.save(model, success);
        };
        
        UsuariosProxy.prototype.getALl = function(){
            this.signupPublicoProxy.getAll();
        };
        
        UsuariosProxy.prototype.delete = function(){
            this.signupPublicoProxy.delete(id);
        };
        
        return new UsuariosProxy();
    }]);
})();