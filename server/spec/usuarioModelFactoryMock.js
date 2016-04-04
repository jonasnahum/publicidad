//var Usuario = require("./usuarioMock");
var Usuario = require("./modelExperimentMock");

var usuarioFactory = {
    get: function() {
        return new Usuario();
    }
};

module.exports = usuarioFactory;