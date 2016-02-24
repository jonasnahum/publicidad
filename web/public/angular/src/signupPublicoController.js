(function() {
    var app = angular.module('app');
    
    app.controller('SignupPublicoController', ['usuariosProxy', '$location', 'tokenStorage', function(proxy, $location, tokenStorage) {
        var ctrl = this;
        
        ctrl.cliente = '';
        ctrl.uniquename = '';
        ctrl.telCliente = '';
        ctrl.noContrato = '';
        ctrl.fechaRegistro = '';
        ctrl.fechaVencimiento = '';
        ctrl.pago = undefined;
        ctrl.paginaWeb = undefined;
        ctrl.email = '';
        ctrl.password = '';
        
        ctrl.signup = function() {
            ctrl.fechaRegistro = Date.now();
            proxy.signupPublico(ctrl, function(data) {
                var userId = data._id;
                $location.path('/publico/nuevo/' + userId);
            });
        };
    }]);
})();