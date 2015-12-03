var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var validation = require("./validation");

var informacionSchema = mongoose.Schema({
    noContrato: validation.validateCampo(true,String,null,null,"validateContrato"),
    url: String,
    cliente: validation.validateCampo(true,String,5,40,"validateNombre"),
    telCliente: validation.validateCampo(true,String,5,15,"validateTel"),
    correoCliente:validation.validateCampo(true,String,null,null,"validateEmail"),
    fechaContrato: Date,
    fechaVencimiento: Date,
    pago: validation.validateCampo(true,String,null,null,"validatePago"), 
});

module.exports = informacionSchema;
