(function() {
    var app = angular.module('app');
    
    app.factory('modelFactory', [function() {
        var ModelFactory = function() {
        };
        ModelFactory.prototype.getCtrlPropertysFromSubdocument = function(data){
            var ctrl = {};
            ctrl.nombre = data.nombre;
            ctrl.logotipo = data.logotipo;
            ctrl.foto = data.foto;
            ctrl.textoIntro = data.textoIntro;
            ctrl.lat = data.lat;
            ctrl.long = data.long;
            ctrl.descripcion = data.descripcion;
            ctrl.horario = data.horario;
            ctrl.encargado = data.encargado;
            ctrl.tel = data.tel;
            ctrl.face = data.face;
            ctrl.email = data.email;
            ctrl.productos = data.productos;
            ctrl.nota = data.nota;

            ctrl.numero = data.direccion.numero;
            ctrl.numeroInt = data.direccion.numeroInt;
            ctrl.calle = data.direccion.calle;
            ctrl.colonia = data.direccion.colonia;
            ctrl.cp = data.direccion.cp;
            ctrl.municipio = data.direccion.municipio;
            ctrl.estado = data.direccion.estado;

            ctrl.rubro = data.rubro.rubro;

            ctrl.noContrato = data.informacion.noContrato;
            ctrl.url = data.informacion.url;
            ctrl.cliente = data.informacion.cliente;
            ctrl.telCliente = data.informacion.telCliente;
            ctrl.correoCliente = data.informacion.correoCliente;
            ctrl.fechaContrato = data.informacion.fechaContrato;
            ctrl.fechaVencimiento = data.informacion.fechaVencimiento;
            ctrl.pago = data.informacion.pago;
            
            return ctrl;
        };
         ModelFactory.prototype.copyModelToCtrl = function(model, ctrl){
            for (var prop in model) {
              ctrl[prop] = model[prop]
            }
            return model;
        };
        ModelFactory.prototype.getModelFromCtrl = function(ctrl){
            var model = {};
            model.nombre=ctrl.nombre,
            model.logotipo=ctrl.logotipo,
            model.foto=ctrl.foto,            
            model.textoIntro=ctrl.textoIntro,
            model.lat= ctrl.lat,
            model.long= ctrl.long,
            model.long=ctrl.long,
            model.descripcion=ctrl.descripcion,
            model.horario=ctrl.horario,
            model.encargado=ctrl.encargado,
            model.tel=ctrl.tel,
            model.face=ctrl.face,
            model.email=ctrl.email,
            model.productos=ctrl.productos,
            model.nota=ctrl.nota,
            model.numero=ctrl.numero,
            model.numeroInt=ctrl.numeroInt,
            model.calle=ctrl.calle,
            model.colonia=ctrl.colonia,
            model.cp=ctrl.cp,
            model.municipio=ctrl.municipio,
            model.estado=ctrl.estado,
            model.rubro=ctrl.rubro,
            model.noContrato=ctrl.noContrato,
            model.url=ctrl.url,
            model.cliente=ctrl.cliente,
            model.telCliente=ctrl.telCliente,
            model.correoCliente=ctrl.correoCliente,
            model.fechaContrato=ctrl.fechaContrato,    
            model.fechaVencimiento=ctrl.fechaVencimiento,    
            model.pago=ctrl.pago
            return model;
        };
        
        return function() {
            return new ModelFactory();
        };
        
    }]);
})();