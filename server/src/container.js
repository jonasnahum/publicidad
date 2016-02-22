//dependencies
var intravenous = require("intravenous");

//local modules
var PaginaWeb = require("./paginaWebCollection");

var models = {
    paginaWeb: PaginaWeb
};

var TokenMiddleware = require("./tokenMiddleware");
TokenMiddleware.$inject = ["models", "jwt"];

var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mongoose"];

var PaginaWebController = require("./paginaWebController");
PaginaWebController.$inject = ["express", "paginaWebApi", "tokenMiddleware"];
var CorreoController = require("./correoController");
CorreoController.$inject = ["express", "correoApi"];

var Copy = require("./copy");
var PaginaWebApi = require("./paginaWebApi");
PaginaWebApi.$inject = ["models", "paginaWebFactory", "copy"];
var CorreoApi = require("./correoApi");
CorreoApi.$inject = ["nodemailer"];

var container = intravenous.create();

//register
container.register("paginaWeb", PaginaWeb);
container.register("models", models);
container.register("express", { module: require('express') });
container.register("mongoose", { module: require('mongoose') });
container.register("fs", { module: require('fs') });
container.register("nodemailer", { module: require('nodemailer') });
container.register("moment", { module: require('moment') });
container.register("jwt", { module: require('jwt-simple') });
container.register("tokenMiddleware", TokenMiddleware);
container.register("paginaWebController", PaginaWebController);
container.register("correoController", CorreoController);
container.register("copy", Copy);
container.register("paginaWebApi", PaginaWebApi);
container.register("correoApi", CorreoApi);

container.register("dbConnection", DbConnection);

module.exports = container;
