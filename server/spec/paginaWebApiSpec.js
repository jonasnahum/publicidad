

describe("paginasweb api", function() {
        //model
        var modelMock1 = require("./modelMock1");//un model trae todos los metodos de búsqueda en la clase, no en el prototype, ahí solo tiene save y la propiedad bd, pero no es una nueva instancia.
        var modelMock2 = require("./modelMock2");
        var modelFactory = require("./usuarioModelFactoryMock");
        
        
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        
        //api
        var PaginaWebApi = require("./../src/paginaWebApi");
        var copy = require("./../src/copy");
        var api = new PaginaWebApi({paginaWeb: modelMock1, usuario: modelMock2}, modelFactory, copy);


    it("getAll", function(done){
        //se arregla la base de datos
        modelMock1.db = [
            {nombre: "Jonas", calificacion: 9},
            {nombre: "ro", calificacion: 8}
        ];
        
        //error
        modelMock1.setError ("find", null);
        
        //se ejecuta metodo.
        api.getAll(null, responseMock, null);
        
        //test
        expect(responseMock.value).toEqual(modelMock1.db);
        expect(modelMock1._path).toEqual('_usuario');
        done();
    });
    it("getAll method error", function(done) {    
        modelMock1.setError ("find", new Error("GetAll method error from paginawebSpec"));
        var next = function(err) {
            expect(err).toEqual(modelMock1.getError("find"));
            done();
        };
        api.getAll(null, responseMock, next);
    });
    it("gets a page if i give a user.uniquename", function(done) {
        //1.- el metodo a testear, primero busca un usuario por uniquename.
        //2.- luego busca una página que en su propiedad _usuario tenga el id del usuario encontrado.
        modelMock1.errors = [];
        modelMock1.setError ("find", null);
        modelMock1.db = [
            {nombreDelaPagina: "aguadelparque", _usuario: 1 }
        ];
        modelMock1.objetoBuscado = undefined;
        modelMock1._path = undefined;
        modelMock1.metodoQueBusca = undefined;

        modelMock2.errors = [];
        modelMock2.setError ("findOne", null);
        modelMock2.db = [];
        modelMock2.objetoBuscado = undefined;
        modelMock2._path = undefined;
        modelMock2.metodoQueBusca = undefined;
        
        modelMock2.db = [
            {nombre: "Pedro", uniquename: "principito", _id: 1}
        ];
        requestMock.params = {uniquename: "principito"};
        
        api.getByUniqueName(requestMock, responseMock, null);
        expect(responseMock.value).toEqual(modelMock1.db[0]);
        expect(modelMock1._path).toEqual('_usuario');
        done();
    });
});
