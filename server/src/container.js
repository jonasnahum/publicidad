//dependencies
var intravenous = require("intravenous");


//local modules
var Imagen = require("./imagenesCollection");
var Empresa = require("./empresaCollection");
var Direccion = require("./direccionCollection");
var Rubro = require("./rubroCollection");
var Informacion = require("./informacionCollection");

var models = {
    imagen: Imagen,
    empresa: Empresa,
    direccion: Direccion,
    rubro: Rubro,
    informacion: Informacion
};


var DbConnection = require("./../database/dbConnection");
DbConnection.$inject = ["mongoose"];

var ImagenesController = require("./imagenesController");
ImagenesController.$inject = ["express", "imagenesApi"];

var EmpresasController = require("./empresasController");
EmpresasController.$inject = ["express", "empresasApi"];
var DireccionController = require("./direccionController");
DireccionController.$inject = ["express", "direccionApi"];
var RubrosController = require("./rubrosController");
RubrosController.$inject = ["express", "rubrosApi"];
var InformacionController = require("./informacionController");
InformacionController.$inject = ["express", "informacionApi"];


var ImagenesApi = require("./imagenesApi");
ImagenesApi.$inject = ["models", "imagenFactory", "fs"];
var EmpresasApi = require("./empresasApi");
EmpresasApi.$inject = ["models", "empresaFactory", "direccionFactory", "rubroFactory", "informacionFactory"];
var DireccionApi = require("./direccionApi");
DireccionApi.$inject = ["models", "direccionFactory"];
var RubrosApi = require("./rubrosApi");
RubrosApi.$inject = ["models", "rubroFactory"];
var InformacionApi = require("./informacionApi");
InformacionApi.$inject = ["models", "informacionFactory"];

var container = intravenous.create();

//register
container.register("imagen", Imagen);
container.register("empresa", Empresa);
container.register("direccion", Direccion);
container.register("rubro", Rubro);
container.register("informacion", Informacion);
container.register("models", models);
container.register("express", { module: require('express') });
container.register("mongoose", { module: require('mongoose') });
container.register("fs", { module: require('fs') });
container.register("imagenesController", ImagenesController);
container.register("empresasController", EmpresasController);
container.register("direccionController", DireccionController);
container.register("rubrosController", RubrosController);
container.register("informacionController", InformacionController);
container.register("imagenesApi", ImagenesApi);
container.register("empresasApi", EmpresasApi);
container.register("direccionApi", DireccionApi);
container.register("rubrosApi", RubrosApi);
container.register("informacionApi", InformacionApi);
container.register("dbConnection", DbConnection);

module.exports = container;
