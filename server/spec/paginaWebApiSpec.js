

describe("paginasweb api", function() {
        //model
        var modelMock = require("./usuarioMock");//un model trae todos los metodos de búsqueda en la clase, no en el prototype, ahí solo tiene save y la propiedad bd, pero no es una nueva instancia.
        var modelFactory = require("./usuarioModelFactoryMock");
        
        
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        
        //api
        var PaginaWebApi = require("./../src/paginaWebApi");
        var copy = require("./../src/copy");
        var api = new PaginaWebApi({paginaWeb: modelMock}, modelFactory, copy);


    it("getAll", function(done){
        //se arregla la base de datos
        modelMock.db = [
            {nombre: "Jonas", calificacion: 9},
            {nombre: "ro", calificacion: 8}
        ];
        
        //error
        modelMock.setError ("find", null);
        
        //se ejecuta metodo.
        api.getAll(null, responseMock, null);
        
        //test
        expect(responseMock.value).toEqual(modelMock.db);
        expect(modelMock._path).toEqual('_usuario');
        done();
    });
    it("getAll method error", function(done) {    
        modelMock.setError ("find", new Error("GetAll method error from paginawebSpec"));
        var next = function(err) {
            expect(err).toEqual(modelMock.getError("find"));
            done();
        };
        api.getAll(null, responseMock, next);
    });
});
