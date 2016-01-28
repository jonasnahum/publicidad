//dependencies
var intravenous = require("intravenous");

//local modules
var Empresa = require("./empresaCollection");
var Usuario = require("./usuarioCollection");

var models = {
    empresa: Empresa,
    usuario: Usuario
};

var TokenMiddleware = require("./tokenMiddleware");
TokenMiddleware.$inject = ["models", "jwt"];

var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mongoose"];

var EmpresasController = require("./empresasController");
EmpresasController.$inject = ["express", "empresasApi", "tokenMiddleware"];
var UsuariosController = require("./usuariosController");
UsuariosController.$inject = ["express", "usuariosApi"];
var CorreoController = require("./correoController");
CorreoController.$inject = ["express", "correoApi"];

var Copy = require("./copy");
var EmpresasApi = require("./empresasApi");
EmpresasApi.$inject = ["models", "empresaFactory", "copy"];
var UsuariosApi = require("./usuariosApi");
UsuariosApi.$inject = ["models", "usuarioFactory", "moment", "jwt"];
var CorreoApi = require("./correoApi");
CorreoApi.$inject = ["nodemailer"];

var container = intravenous.create();

//register
container.register("empresa", Empresa);
container.register("usuario", Usuario);
container.register("models", models);
container.register("express", { module: require('express') });
container.register("mongoose", { module: require('mongoose') });
container.register("fs", { module: require('fs') });
container.register("nodemailer", { module: require('nodemailer') });
container.register("moment", { module: require('moment') });
container.register("jwt", { module: require('jwt-simple') });
container.register("tokenMiddleware", TokenMiddleware);
container.register("empresasController", EmpresasController);
container.register("usuariosController", UsuariosController);
container.register("correoController", CorreoController);
container.register("copy", Copy);
container.register("empresasApi", EmpresasApi);
container.register("usuariosApi", UsuariosApi);
container.register("correoApi", CorreoApi);

container.register("dbConnection", DbConnection);

module.exports = container;
