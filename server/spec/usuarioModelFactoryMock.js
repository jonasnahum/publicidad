var Usuario = require("./usuarioMock");

var usuarioFactory = {
    get: function() {
        return new Usuario();
    }
};

module.exports = usuarioFactory;