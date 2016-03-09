var PaginaWeb = require("./paginaWebMock");

var paginaWebFactory = {
    get: function() {
        return new PaginaWeb();
    }
};

module.exports = paginaWebFactory;