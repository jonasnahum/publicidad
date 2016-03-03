(function() {
    var app = angular.module('app');
    
    app.factory("usuariosProxy", ["proxyFactory", "constants", function(proxyFactory, constants) {
        var UsuariosProxy = function() {                   
            this.signupPublicoProxy = proxyFactory(constants.server + '/usuario/api/');
        };
        UsuariosProxy.prototype.signupPublico = function(model, success){
            this.signupPublicoProxy.signupPublico(model, success);
        };
        
        UsuariosProxy.prototype.getALl = function(){
            this.signupPublicoProxy.getAll();
        };
        
        UsuariosProxy.prototype.delete = function(id, success){
            this.signupPublicoProxy.delete(id, success);
        };
        
        return new UsuariosProxy();
    }]);
})();
