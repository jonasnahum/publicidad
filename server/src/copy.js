var Copy = (function() {
    var Copy = function() {
    };
    Copy.prototype.copyBodyToPagina = function(body, pagina){
        var pagina = pagina;
        pagina.nombre = body.nombre;
        pagina.logotipo = body.logotipo;
        pagina.foto = body.foto;
        pagina.colorBackground = body.colorBackground;
        pagina.colorText = body.colorText;
        pagina.textoIntro = body.textoIntro;
        pagina.lat = body.lat;
        pagina.long = body.long;
        pagina.descripcion = body.descripcion;
        pagina.horario = body.horario;
        pagina.encargado = body.encargado;
        pagina.tel = body.tel;
        pagina.face = body.face;
        pagina.flickr = body.flickr;
        pagina.whats = body.whats;
        pagina.links = body.links;
        pagina.email = body.email;
        pagina.productos = body.productos;
        pagina.nota = body.nota;
        pagina.direccion={
            numero: body.numero,
            numeroInt: body.numeroInt,
            calle: body.calle,
            colonia: body.colonia,
            cp: body.cp,
            municipio: body.municipio,
            estado: body.estado
        };
        pagina.rubro={
            rubro: body.rubro
        };        
        return pagina;
    };
    Copy.prototype.copyBodyToUsuario = function(body, usuario){
        var usuario = usuario;
        usuario.noContrato = body.noContrato;
        usuario.uniquename = body.uniquename;
        usuario.cliente = body.cliente;
        usuario.telCliente = body.telCliente;
        usuario.email = body.correoCliente;
        usuario.fechaRegistro = body.fechaContrato;
        usuario.fechaVencimiento = body.fechaVencimiento;
        usuario.password = body.password;
        usuario.pago = body.pago;

        return usuario;
    };

    return Copy;
})();

module.exports = new Copy(); 