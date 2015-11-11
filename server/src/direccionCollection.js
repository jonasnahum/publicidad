var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    numero: String,
    numeroInt: String,
    calle: String,
    colonia: String,
    cp: String,
    municipio: String,
    estado: String,
    _empresaId:  { type: Schema.Types.ObjectId, required: true, ref: 'Empresa' }
});

module.exports = mongoose.model('Direccion', schema);