//dependencies
var intravenous = require("intravenous");


//local modules
var Imagen = require("./imagenesCollection");
var Empresa = require("./empresaCollection");

var models = {
    imagen: Imagen,
    empresa: Empresa
};

var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mongoose"];

var ImagenesController = require("./imagenesController");
ImagenesController.$inject = ["express", "imagenesApi"];
var EmpresasController = require("./empresasController");
EmpresasController.$inject = ["express", "empresasApi"];
var CorreoController = require("./correoController");
CorreoController.$inject = ["express", "correoApi"];

var ImagenesApi = require("./imagenesApi");
ImagenesApi.$inject = ["models", "imagenFactory", "fs"];
var EmpresasApi = require("./empresasApi");
EmpresasApi.$inject = ["models", "empresaFactory"];
var CorreoApi = require("./correoApi");
CorreoApi.$inject = ["nodemailer"];

var container = intravenous.create();

//register
container.register("imagen", Imagen);
container.register("empresa", Empresa);
container.register("models", models);
container.register("express", { module: require('express') });
container.register("mongoose", { module: require('mongoose') });
container.register("fs", { module: require('fs') });
container.register("nodemailer", { module: require('nodemailer') });
container.register("imagenesController", ImagenesController);
container.register("empresasController", EmpresasController);
container.register("correoController", CorreoController);
container.register("imagenesApi", ImagenesApi);
container.register("empresasApi", EmpresasApi);
container.register("correoApi", CorreoApi);

container.register("dbConnection", DbConnection);

module.exports = container;
