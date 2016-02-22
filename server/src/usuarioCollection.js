var mongoose = require("mongoose");
var validation = require("./validation");

var validateCorreo = [
    {validator: /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/, msg: 'mongoose requiere un correo electrónico válido'}
];

var schema = mongoose.Schema({
    cliente: validation.validateCampo(true,String,5,40,"validateNombre"),
    uniquename:  {
        type: String,
        trim: true,//quita los espacios.
        unique: true,
        index: true,//hace más eficiente la búsqueda. checar findByName.
        validate: [validation.uniquenameRegex],
    },
    telCliente: validation.validateCampo(true,String,5,15,"validateTel"),
    //noContrato: validation.validateCampo(true,String,null,null,"validateContrato"),
    noContrato: validation.validateCampo(false,String,null,null,"validateContrato"),
    fechaRegistro: Date,
    fechaVencimiento: Date,
    //pago: validation.validateCampo(true,String,null,null,"validatePago"), 
    pago: validation.validateCampo(false,String,null,null,"validatePago"), 
    email: { type: String, unique: true, required: true, validate: validateCorreo },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', schema);