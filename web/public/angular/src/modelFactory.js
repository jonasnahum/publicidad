(function() {
    var app = angular.module('app');
    
    app.factory('modelFactory', [function() {
        var ModelFactory = function() {
        };
        ModelFactory.prototype.getObjFromSubdocument = function(data){
            var obj = {};
            obj.nombre = data.nombre;
            obj.logotipo = data.logotipo;
            obj.foto = data.foto;
            obj.colorBackground = data.colorBackground;
            obj.colorText = data.colorText;
            obj.textoIntro = data.textoIntro;
            obj.lat = data.lat;
            obj.long = data.long;
            obj.descripcion = data.descripcion;
            obj.horario = data.horario;
            obj.encargado = data.encargado;
            obj.tel = data.tel;
            obj.face = data.face;
            obj.flickr = data.flickr;
            obj.whats = data.whats;
            obj.link1 = data.link1;
            obj.link2 = data.link2;
            obj.email = data.email;
            obj.productos = data.productos;
            obj.nota = data.nota;

            obj.numero = data.direccion.numero;
            obj.numeroInt = data.direccion.numeroInt;
            obj.calle = data.direccion.calle;
            obj.colonia = data.direccion.colonia;
            obj.cp = data.direccion.cp;
            obj.municipio = data.direccion.municipio;
            obj.estado = data.direccion.estado;

            obj.rubro = data.rubro.rubro;

            obj.noContrato = data.informacion.noContrato;
            obj.uniquename = data.informacion.uniquename;
            obj.cliente = data.informacion.cliente;
            obj.telCliente = data.informacion.telCliente;
            obj.correoCliente = data.informacion.correoCliente;
            obj.fechaContrato = data.informacion.fechaContrato;
            obj.fechaVencimiento = data.informacion.fechaVencimiento;
            obj.pago = data.informacion.pago;
            
            return obj;
        };
         ModelFactory.prototype.copyObjToCtrl = function(obj, ctrl){
            for (var prop in obj) {
              ctrl[prop] = obj[prop]
            }
            return ctrl;
        };
        ModelFactory.prototype.getModelFromCtrl = function(ctrl){
            var model = {};
            model.nombre=ctrl.nombre,
            model.logotipo=ctrl.logotipo,
            model.foto=ctrl.foto,    
            model.colorBackground=ctrl.colorBackground,
            model.colorText=ctrl.colorText,        
            model.textoIntro=ctrl.textoIntro,
            model.lat= ctrl.lat,
            model.long= ctrl.long,
            model.long=ctrl.long,
            model.descripcion=ctrl.descripcion,
            model.horario=ctrl.horario,
            model.encargado=ctrl.encargado,
            model.tel=ctrl.tel,
            model.face=ctrl.face,
            model.flickr=ctrl.flickr,
            model.whats=ctrl.whats,
            model.link1=ctrl.link1,
            model.link2=ctrl.link2,
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
            model.uniquename=ctrl.uniquename,
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