(function() {
    var app = angular.module('app');
    
    app.controller('SignupPublicoController', ['usuariosProxy', '$location', function(proxy, $location) {
        var ctrl = this;
        
        ctrl.cliente = '';
        ctrl.uniquename = '';
        ctrl.telCliente = '';
        ctrl.noContrato = '';
        ctrl.fechaRegistro = '';
        ctrl.fechaVencimiento = '';
        ctrl.pago = 1;//cambiar a undefined
        ctrl.paginaWeb = undefined;
        ctrl.email = '';
        ctrl.password = '';
        
        ctrl.signup = function() {
            ctrl.fechaRegistro = Date.now();
            proxy.signupPublico(ctrl, function() {
                $location.path('/publico/nuevo');
            });
        };
    }]);
})();