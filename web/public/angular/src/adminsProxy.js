(function() {
    var app = angular.module('app');
                
    app.factory("adminsProxy", ["proxyFactory", "constants", function(proxyFactory, constants) {
        var AdminsProxy = function() {                   
            this.signinProxy = proxyFactory(constants.server + '/admin/api/signin');
            this.signupProxy = proxyFactory(constants.server + '/admin/api/signup');
            this.proxy = proxyFactory(constants.server + '/admin/api/');
        };
        
        AdminsProxy.prototype.signin = function(model, success){
            this.signinProxy.save(model, success);
        };
        AdminsProxy.prototype.signup = function(model, success){
            this.signupProxy.save(model, success);
        };
        
        AdminsProxy.prototype.getAll = function(callback){
            this.proxy.getAll(callback);
        };
        
        AdminsProxy.prototype.delete = function(id, success){
            this.proxy.delete(id, success);
        };
        
        return new AdminsProxy();
    }]);
})();
