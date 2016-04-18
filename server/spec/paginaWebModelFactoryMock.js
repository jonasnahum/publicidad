var PaginaWeb = require("./modelMock1");

var modelFactory = {
    get: function() {
        return new PaginaWeb();
    }
};

module.exports = modelFactory;