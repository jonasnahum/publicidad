//dependencies
var intravenous = require("intravenous");


//local modules
var Imagen = require("./imagenesCollection");

var models = {
    imagen: Imagen
};


var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mongoose"];

var ImagenesController = require("./imagenesController");
ImagenesController.$inject = ["express", "imagenesApi"];
//var EmpresasController = require("./empresasController");
//EmpresasController.$inject = ["express", "empresasApi"];

var ImagenesApi = require("./imagenesApi");
ImagenesApi.$inject = ["models", "imagenFactory", "fs"];


var container = intravenous.create();

//register
container.register("imagen", Imagen);
container.register("models", models);
container.register("express", { module: require('express') });
container.register("mongoose", { module: require('mongoose') });
container.register("fs", { module: require('fs') });
container.register("imagenesController", ImagenesController);
//container.register("empresasController", EmpresasController);
container.register("imagenesApi", ImagenesApi);
container.register("dbConnection", DbConnection);

module.exports = container;