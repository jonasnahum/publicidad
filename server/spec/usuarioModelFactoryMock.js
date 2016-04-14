//var Usuario = require("./usuarioMock");
//var Usuario = require("./modelExperimentMock");
var Usuario = require("./modelMock2")

var usuarioFactory = {
    get: function() {
        return new Usuario();
    }
};

module.exports = usuarioFactory;