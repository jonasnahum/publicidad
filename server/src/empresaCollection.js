var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validation = require("./validation");
var direccionSchema = require("./dirSchema.js");
var rubroSchema = require("./rubroSchema.js");
var usuarioSchema = require("./usuarioCollection.js");

var empresaSchema = mongoose.Schema({
    nombre: validation.validateCampo(true,String,2,40,"validateNombre"),
    logotipo: String, 
    foto: String,
    colorBackground: String, 
    colorText: String, 
    textoIntro: validation.validateCampo(false,String,null,360), 
    lat: String, 
    long: String, 
    descripcion: validation.validateCampo(false,String,null,180), 
    horario: { type: String, required: true,  maxlength: 100 }, 
    encargado: validation.validateCampo(true,String,5,40,"validateNombre"),
    tel: validation.validateCampo(true,String,5,15,"validateTel"),
    face: { type: String, maxlength: 20},
    flickr : { type: String },
    whats : { type: String },
    link1 : { type: String },
    link2 : { type: String },
    email: validation.validateCampo(true,String,null,null,"validateEmail"),
    productos: Array,/*validation.validateCampo(false,Array,null,null,"validateProductos"),*/
    nota: { type: String, maxlength: 180}, 
    direccion: direccionSchema,
    rubro: rubroSchema,
    _usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Empresa', empresaSchema);

