(function() {
    var app = angular.module('app');
    
    app.controller('IndexController', ['$http', '$location', function($http, $location) {
        var ctrl = this;
        ctrl.nombre = undefined;
        //ctrl.logotipo = undefined;
        //ctrl.foto = undefined;
        ctrl.txtIntroductorio = undefined;
        ctrl.numero = undefined;
        ctrl.numInt = undefined;
        ctrl.calle = undefined;
        ctrl.colonia = undefined;
        ctrl.cp = undefined;
        ctrl.municipio = undefined;
        ctrl.estado = undefined;
        //ctrl.mapa = undefined;
        ctrl.rubro = undefined;
        ctrl.descripcion = undefined;
        ctrl.horario = undefined;
        ctrl.encargado = undefined;
        ctrl.telefono = undefined;
        ctrl.facebook = undefined;
        ctrl.email = undefined;
        ctrl.titulo = undefined;
        ctrl.parrafo = undefined;
        ctrl.nota = undefined;
        ctrl.emailMercadoUpn = undefined;
        ctrl.numContrato = undefined;
        ctrl.pagWebCliente = undefined;
        ctrl.nombreCte = undefined;
        ctrl.telefonoCte = undefined;
        ctrl.emailCte = undefined;
        ctrl.fechaContrato = undefined;
        ctrl.venceContrato = undefined;
        ctrl.precio = undefined;
                
        ctrl.save = function() {
            console.dir(ctrl);
            $http({
                url: '/miEmpresa',
                method: "POST",
                data: ctrl
            }).success(function(data, status, headers, config){
                $location.path('/');
            }).error(function(data, status, headers, config) {
                console.log(status);
                
            });
        };        
        
    }]);
    
})();