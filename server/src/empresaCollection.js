var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var direccionSchema = mongoose.Schema({
    numero: String,
    numeroInt: String,
    calle: String,
    colonia: String,
    cp: String,
    municipio: String,
    estado: String,
});

var rubroSchema = mongoose.Schema({
    rubro: String,
});

var informacionSchema = mongoose.Schema({
    noContrato: String,
    url: String,
    cliente: String,
    telCliente: String,
    correoCliente: String,
    fechaContrato: Date,
    fechaVencimiento: Date,
    pago: String,
});

var schema = mongoose.Schema({
    nombre: String, 
    logotipo: String, 
    foto: String, 
    textoIntro: String, 
    lat: String, 
    long: String, 
    descripcion: String, 
    horario: String, 
    encargado: String, 
    tel: String, 
    face: String, 
    email: String, 
    productos: [],
    nota: String,
    direccion: direccionSchema,
    rubro: rubroSchema,
    informacion: informacionSchema,
});

module.exports = mongoose.model('Empresa', schema);