(function() {
    var app = angular.module('app');
    
    app.factory("usuariosProxy", ["proxyFactory", "constants", function(proxyFactory, constants) {
        var UsuariosProxy = function() {                   
            /*this.signinProxy = proxyFactory(constants.server + '/usuarios/api/signin');
            this.signupProxy = proxyFactory(constants.server + '/usuarios/api/signup');*/
            this.signupPublicoProxy = proxyFactory(constants.server + '/usuario/api/');
        };
        /*
        UsuariosProxy.prototype.signin = function(model, success){
            this.signinProxy.save(model, success);
        };
        UsuariosProxy.prototype.signup = function(model, success){
            this.signupProxy.save(model, success);
        };
        */
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


/*
(function() {
    var app = angular.module('app');
    
    app.factory("usuariosProxy", ["proxyFactory", "constants", function(proxyFactory, constants) {
        var UsuariosProxy = function() {                   
            this.signinProxy = proxyFactory(constants.server + '/usuarios/api/signin');
            this.signupProxy = proxyFactory(constants.server + '/usuarios/api/signup');
            this.signupPublicoProxy = proxyFactory(constants.server + '/usuarios/api/signupPublico');
            this.proxy = proxyFactory(constants.server + '/usuarios/api/');//return proxy para q funcione?
        };
        
        UsuariosProxy.prototype.signin = function(model, success){
            this.signinProxy.save(model, success);
        };
        UsuariosProxy.prototype.signup = function(model, success){
            this.signupProxy.save(model, success);
        };
        UsuariosProxy.prototype.signupPublico = function(model, success){
            this.signupPublicoProxy.signupPublico(model, success);
        };
        
        /**********
        UsuariosProxy.prototype.getALl = function(){
            this.signupPublicoProxy.getAll();
        };
        
        UsuariosProxy.prototype.delete = function(){
            this.signupPublicoProxy.delete(id);
        };
        ***********--/
        
        return new UsuariosProxy();
    }]);
})();
*/
/*(function() {
  //  var app = angular.module('app');
    
    //app.factory('usuariosProxy', ['proxyFactory', 'constants', function(proxyFactory, constants) {
        //la variable constante contiene : { server: process.env.SERVER || 'http://localhost:3000' }.
        var proxy = proxyFactory( constants.server + '/usuarios/api/');
        return proxy;     
    }]);
})();
*/