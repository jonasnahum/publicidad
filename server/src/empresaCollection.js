var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var minFive = function(val) {
    if (val && val.length >= 5 ){
        return true;
    }
    return false;
};
var minTen = function(val) {
    if (val && val.length >= 10 ){
        return true;
    }
    return false;
};
var maxForty = function(val) {
    if (val && val.length <= 40 ){
        return true;
    }
    return false;
};
var maxEighty = function(val) {
    if (val && val.length <= 80 ){
        return true;
    }
    return false;
};
var maxFiveTeen = function(val) {
    if (val && val.length <= 15 ){
        return true;
    }
    return false;
};
var  maxOeighty = function(val) {
    if (val && val.length <= 180 ){
        return true;
    }
    return false;
};
var  maxO = function(val) {
    if (val && val.length <= 100 ){
        return true;
    }
    return false;
};

var letrasEspacios = {validator: /^[A-Za-z ]+$/, msg: 'Este campo sólo acepta letras y espacios'};
var numeros = {validator: /^[0-9]*$/, msg: 'Este campo sólo acepta letras y espacios'};

var validateNombre = [
    {validator: minTen, msg: 'Demasiado corto'} ,
    {validator: maxForty, msg: 'Demasiado largo'} ,
    letrasEspacios
];
var validateTextoIntro = [
    {validator: maxEighty, msg: 'Demasiado largo'} ,
];
var validateDescripcion = [
    letrasEspacios,
    {validator: maxOeighty, msg: 'Demasiado largo'} ,
];
var validateHorario = [
    {validator: maxO, msg: 'Demasiado largo'} ,
];
var validateTel = [
    {validator: minFive, msg: 'Demasiado corto'} ,
    {validator: maxFiveTeen, msg: 'largo corto'},
    numeros,
];
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
    nombre: { type: String, required: true, validate: validateNombre },
    logotipo: String, 
    foto: String, 
    textoIntro: { type: String, required: true, validate: validateTextoIntro }, 
    lat: String, 
    long: String, 
    descripcion: { type: String, validate: validateDescripcion }, 
    horario: { type: String, required: true, validate: validateHorario }, 
    encargado: { type: String, required: true, validate: validateNombre }, 
    tel: { type: String, required: true, validate: validateTel },
    face: String, 
    email: String, 
    productos: [],
    nota: String,
    direccion: direccionSchema,
    rubro: rubroSchema,
    informacion: informacionSchema,
});

module.exports = mongoose.model('Empresa', schema);

/*

var lengthValidator = function(val) {
    if (val && val.length >= 3){
        return true;
    }
    return false;
};
var dosOpciones = function(val) {
    if ( val === "ingreso" || val === "egreso"  ){
        return true;
    }
    return false;
};

var validateNombre = [
    {validator: lengthValidator, msg: 'mongoose requiere nombre completo.'}
];
var validateTipo = [
    {validator: dosOpciones, msg: 'mongoose requiere la palabra ingreso o egreso.'}
];
var validateDecimal = [
    {validator: /^[0-9]{1,7}(\.[0-9]+)?$/, msg: 'mongoose requiere un número o numero con decimal.'}
];

var schema = Schema({
    fecha: { type: Date, default: Date.now },
    nombre: { type: String, required: true, validate: validateNombre },
    _rubro:  { type: Schema.Types.ObjectId, required: true, ref: 'Rubro' },
    _balanceId:  { type: Schema.Types.ObjectId, required: true, ref: 'Balance' },
    tipo: { type: String, required: true, validate: validateTipo },
    cantidad: { type: String, required: true, validate: validateDecimal },
    comentarios: { type: String },
    balance: { type: Number, required: 'mongoose requiere balance' },
});

module.exports = mongoose.model('Producto', schema);


*/