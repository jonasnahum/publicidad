//dependencies
var intravenous = require("intravenous");

//local modules
var PaginaWeb = require("./paginaWebCollection");
var Usuario = require("./usuarioCollection");
var Admin = require("./adminCollection");

var models = {
    paginaWeb: PaginaWeb,
    usuario: Usuario,
    admin: Admin
};

var TokenMiddleware = require("./tokenMiddleware");
TokenMiddleware.$inject = ["models", "jwt"];

var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mongoose"];

var PaginaWebController = require("./paginaWebController");
PaginaWebController.$inject = ["express", "paginaWebApi", "tokenMiddleware"];
var UsuarioController = require("./usuarioController");
UsuarioController.$inject = ["express", "usuarioApi", "tokenMiddleware"];
var AdminController = require("./adminController");
AdminController.$inject = ["express", "adminApi", "tokenMiddleware"];
var CorreoController = require("./correoController");
CorreoController.$inject = ["express", "correoApi"];

var Copy = require("./copy");

var PaginaWebApi = require("./paginaWebApi");
PaginaWebApi.$inject = ["models", "paginaWebFactory", "copy"];
var UsuarioApi = require("./usuarioApi");
UsuarioApi.$inject = ["models", "usuarioFactory"];
var AdminApi = require("./adminApi");
AdminApi.$inject = ["models", "adminFactory", "moment", "jwt"];
var CorreoApi = require("./correoApi");
CorreoApi.$inject = ["nodemailer"];

var container = intravenous.create();

//register
container.register("paginaWeb", PaginaWeb);
container.register("usuario", Usuario);
container.register("admin", Admin);
container.register("models", models);
container.register("express", { module: require('express') });
container.register("mongoose", { module: require('mongoose') });
container.register("fs", { module: require('fs') });
container.register("nodemailer", { module: require('nodemailer') });
container.register("moment", { module: require('moment') });
container.register("jwt", { module: require('jwt-simple') });
container.register("tokenMiddleware", TokenMiddleware);
container.register("paginaWebController", PaginaWebController);
container.register("usuarioController", UsuarioController);
container.register("adminController", AdminController);
container.register("correoController", CorreoController);
container.register("copy", Copy);
container.register("paginaWebApi", PaginaWebApi);
container.register("usuarioApi", UsuarioApi);
container.register("adminApi", AdminApi);
container.register("correoApi", CorreoApi);

container.register("dbConnection", DbConnection);

module.exports = container;