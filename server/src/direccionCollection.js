var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    calle: String,
    _empresaId:  { type: Schema.Types.ObjectId, required: true, ref: 'Empresa' }
});

module.exports = mongoose.model('Direccion', schema);