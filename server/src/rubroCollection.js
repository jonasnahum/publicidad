var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = mongoose.Schema({
    rubro: String,
    _empresaId:  { type: Schema.Types.ObjectId, required: true, ref: 'Empresa' }
});

module.exports = mongoose.model('Rubro', schema);