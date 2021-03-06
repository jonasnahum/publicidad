var mongoose = require("mongoose");
var validation = require("./validation");

var validateCorreo = [
    {validator: /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z{|}~])*@[a-zA-Z](-?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/, msg: 'mongoose requiere un correo electrónico válido'}
];

var schema = mongoose.Schema({
    email: { type: String, required: true, validate: validateCorreo },
    password: { type: String }
});

module.exports = mongoose.model('Admin', schema);
