var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var float = {validator: /^[-+]?([0-9]*\.[0-9]+|[0-9]+)$/, msg: 'Este campo sólo número o números con decimales'};
var letrasEspaciosAcentos = {validator: /^[A-Za-záéíóú ]+$/, msg: 'Este campo sólo acepta letras y espacios'};
var numeros = {validator: /^[0-9]*$/, msg: 'Este campo sólo acepta numeros'};
var email = {validator: /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/, msg: 'Este campo sólo acepta correos válidos'};
var productos = function(val) {
    if (val && val.length <= 10){
        return true;
    }
    return false;
};

var validateNombre = [
    letrasEspaciosAcentos
];

var validateDescripcion = [
    letrasEspaciosAcentos
];

var validateTel = [
    numeros
];
var validateEmail = [
    email
];
var validateProductos = [
    productos
];
var validateCalle = [
    letrasEspaciosAcentos
];
var validateColonia = [
    letrasEspaciosAcentos
];
var validateCp = [
    numeros
];
var validateMunicipio = [
    letrasEspaciosAcentos
];
var validateEstado = [
    letrasEspaciosAcentos
];
var validateRubro = [
    letrasEspaciosAcentos
];
var validateContrato = [
    numeros
];
var validatePago = [
    float,
    numeros
];

var direccionSchema = mongoose.Schema({
    numero: { type: String, maxlength: 5 },
    numeroInt: { type: String, maxlength: 5 },
    calle: { type: String, required: true, maxlength: 40, validate: validateCalle },
    colonia: { type: String, required: true, maxlength: 30, validate: validateColonia },
    cp: { type: String, required: true, minlength: 5, maxlength: 5, validate: validateCp },
    municipio: { type: String, required: true, minlength: 5, maxlength: 20, validate: validateMunicipio },
    estado: { type: String, required: true, minlength: 5, maxlength: 20, validate: validateEstado },
});

var rubroSchema = mongoose.Schema({
    rubro: { type: String, required: true, minlength: 5, maxlength: 40, validate: validateRubro },
});

var informacionSchema = mongoose.Schema({
    noContrato:  { type: String, required: true, validate: validateContrato },
    url: String,
    cliente: { type: String, required: true,  minlength: 5, maxlength: 40,  validate: validateNombre },
    telCliente: { type: String, required: true, validate: validateTel, minlength: 5, maxlength: 15 },
    correoCliente:{ type: String, required: true, validate: validateEmail }, 
    fechaContrato: Date,
    fechaVencimiento: Date,
    pago: { type: String, required: true, validate: validatePago}, 
});

var empresaSchema = mongoose.Schema({
    nombre: { type: String, required: true,  minlength: 5, maxlength: 40,  validate: validateNombre },
    logotipo: String, 
    foto: String, 
    textoIntro: { type: String, required: true, maxlength: 80}, 
    lat: String, 
    long: String, 
    descripcion: { type: String, validate: validateDescripcion,  maxlength: 180 }, 
    horario: { type: String, required: true,  maxlength: 100 }, 
    encargado: { type: String, required: true, validate: validateNombre, minlength: 5, maxlength: 40 }, 
    tel: { type: String, required: true, validate: validateTel, minlength: 5, maxlength: 15 },
    face: { type: String, maxlength: 20}, 
    email: { type: String, required: true, validate: validateEmail}, 
    productos: { type: Array, validate: validateProductos},
    nota: { type: String, maxlength: 180}, 
    direccion: direccionSchema,
    rubro: rubroSchema,
    informacion: informacionSchema,
});

module.exports = mongoose.model('Empresa', empresaSchema);

