(function() {
    var app = angular.module('app');
    
    app.controller('SigninController', ['adminsProxy', '$location', 'tokenStorage', function(proxy, $location, tokenStorage) {
        var ctrl = this;
        
        ctrl.email = '';
        ctrl.password = '';
        
        ctrl.signin = function() {
            proxy.signin(ctrl, function(tokenObj) {
                tokenStorage.setToken(tokenObj);
                $location.path('/privado/todos');
            });
        };
        
    }]);
})();