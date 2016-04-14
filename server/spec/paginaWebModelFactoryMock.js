var PaginaWeb = require("./modelExperimentMock");

var modelFactory = {
    get: function() {
        return new PaginaWeb();
    }
};

module.exports = modelFactory;