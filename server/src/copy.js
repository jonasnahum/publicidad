var Copy = (function() {
    var Copy = function() {
    };
    Copy.prototype.copyBodyToEmpresa = function(body, empresa){
        console.log("entŕo a copy");
        var empresa = empresa;
        empresa.nombre = body.nombre;
        empresa.logotipo = body.logotipo;
        empresa.foto = body.foto;
        empresa.colorBackground = body.colorBackground;
        empresa.colorText = body.colorText;
        empresa.textoIntro = body.textoIntro;
        empresa.lat = body.lat;
        empresa.long = body.long;
        empresa.descripcion = body.descripcion;
        empresa.horario = body.horario;
        empresa.encargado = body.encargado;
        empresa.tel = body.tel;
        empresa.face = body.face;
        empresa.flickr = body.flickr;
        empresa.whats = body.whats;
        empresa.link1 = body.link1;
        empresa.link2 = body.link2;
        empresa.email = body.email;
        empresa.productos = body.productos;
        empresa.nota = body.nota;
        empresa.direccion={
            numero: body.numero,
            numeroInt: body.numeroInt,
            calle: body.calle,
            colonia: body.colonia,
            cp: body.cp,
            municipio: body.municipio,
            estado: body.estado
        };
        empresa.rubro={
            rubro: body.rubro
        };
        empresa._usuario={
            noContrato: body.noContrato,
            uniquename: body.uniquename,
            cliente: body.cliente,
            telCliente: body.telCliente,
            correoCliente: body.correoCliente,
            fechaRegistro: body.fechaContrato||Date.now(),
            fechaVencimiento: body.fechaVencimiento||Date.now(),
            pago: body.pago
            //pagWeb
            //email
            //password
            
        };
        
        return empresa;
    };

    return Copy;
})();

module.exports = new Copy(); 