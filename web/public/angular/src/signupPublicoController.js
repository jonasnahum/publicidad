(function() {
    var app = angular.module('app');
    
    app.controller('SignupPublicoController', ['usuariosProxy', '$location', function(proxy, $location) {
        var ctrl = this;
        
        ctrl.signup = function() {
            ctrl.fechaRegistro = Date.now();
            proxy.signupPublico(ctrl, function(data) {
                var userId = data._id;
                $location.path('/publico/nuevo/' + userId);
            });
        };
    }]);
})();