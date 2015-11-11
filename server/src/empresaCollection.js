var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
    nota: String
});

module.exports = mongoose.model('Empresa', schema);