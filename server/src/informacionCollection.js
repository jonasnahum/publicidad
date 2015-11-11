var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    noContrato: String,
    url: String,
    cliente: String,
    telCliente: String,
    correo: String,
    fechaContrato: Date,
    fechaVencimiento: Date,
    pago: String,
    _empresaId:  { type: Schema.Types.ObjectId, required: true, ref: 'Empresa' }
});

module.exports = mongoose.model('Información', schema);