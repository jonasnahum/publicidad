

describe("admin api", function() {
        //model
        var modelMock = require("./usuarioMock");//un model trae todos los metodos de búsqueda en la clase, no en el prototype, ahí solo tiene save y la propiedad bd, pero no es una nueva instancia.
        var modelFactory = require("./usuarioModelFactoryMock");
        
        
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        
        //api
        var AdminApi = require("./../src/adminApi");
        var jwt = require("./jwtMock");
        var moment = require("./momentMock");
        var api = new AdminApi({admin: modelMock}, modelFactory, moment, jwt);

    it("getAll method admin", function(done){
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
        done();
    });
    
    it("getAll method error", function(done) {    
        modelMock.setError ("find", new Error("GetAll method error from adminapiSpec"));
        var next = function(err) {
            expect(err).toEqual(modelMock.getError("find"));
            done();
        };
        api.getAll(null, responseMock, next);
    });
    it("getOne method", function(done) {      
        
        modelMock.db = [
            {nombre: "Pedro", calificacion: 8, id: 1}
        ];
        requestMock.params = {id: 1};
        
        api.getOne(requestMock, responseMock, null);
        expect(responseMock.value).toEqual(modelMock.db[0]);
        done();
    });
    it("getOne method error", function(done) { 
        modelMock.setError("findById", new Error("Get one error grom adminapispec"));
        
        requestMock.params = {id: 1};
        
        api.getOne(requestMock, responseMock, function(err) {
            expect(err).toEqual(modelMock.getError("findById"));
            done();
        });
    });
    it("findByEmail method error", function(done) {      
        modelMock.setError("findOne", new Error("FindOne error from adminapispec"));
        /*modelMock.db = [
            {nombre: "Pedro", email: "jonasnahum@gmail.com", calificacion: 8, id: 1}
        ];*/
        requestMock.body.email = "jonasnahum@gmail.com";   
        
        api.findByEmail(requestMock, responseMock,  function(err) {
            expect(err).toEqual(modelMock.getError("findOne"));
            done();
        });
    });
    it("findByEmail !admin", function(done) {      
        modelMock.setError("findOne", null);
        modelMock.db = [
            {nombre: "Pedro", email: "jonasnahum@gmail.com", calificacion: 8, id: 1}
        ];
        
        api.findByEmail(requestMock, responseMock, null);
        expect(responseMock.numero).toEqual(401);
        done();
    });
    it("findByEmail req.body.password !== passunique", function(done) {      
        modelMock.setError("findOne", null);
        modelMock.db = [
            {nombre: "Pedro", email: "jonasnahum@gmail.com", calificacion: 8, id: 1}
        ];
        responseMock.numero = undefined;
        requestMock.body.email = "jonasnahum@gmail.com";    
        requestMock.body.password = "mexico";
        
        api.findByEmail(requestMock, responseMock, null);
        expect(responseMock.numero).toEqual(401);
        done();
    });
    it("findByEmail succesfull response", function(done) {      
        modelMock.setError("findOne", null);
        modelMock.db = [
            {nombre: "Pedro", email: "jonasnahum@gmail.com", calificacion: 8, id: 1}
        ];
        requestMock.body.email = "jonasnahum@gmail.com";    
        requestMock.body.password = "passunique";
        moment.expires = "nunca";
        
        api.findByEmail(requestMock, responseMock, null);
        expect(responseMock.value.token).toEqual(jwt.tokenEncodeado);
        done();
    });
    
    
    
    /*
    it("save method", function(done) {//will trigger jasmine-node to run the test asynchronously waiting until the done() callback is called.An asynchronous test will fail after 5000 ms if done() is not called. 
        var usuarioMock = require("./usuarioMock");
        var usuarioFactory = require("./usuarioModelFactoryMock");//regresa una nueva instancia de usuarioMock, osea que tiene save en su prototype.
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        requestMock.body = {nombre: "Juan", calificacion: 8};
        
        api.save(requestMock, responseMock, null);
        expect(responseMock.value.nombre).toBe(requestMock.body.nombre);
        expect(responseMock.value.calificacion).
        toBe(requestMock.body.calificacion);
        done();          
    });
    
    it("save method error", function(done) {
        var usuarioMock = require("./usuarioMock");
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        usuarioMock.setError("save", new Error("save method error"));
        
        api.save(requestMock, responseMock, function(err){
            expect(err).toEqual(usuarioMock.getError("save"));
            done();
        });
    });
    

    it("getOne method error", function(done) {
        var usuarioMock = require("./usuarioMock");
        var requestMock = require("./requestMock");
        var responseMock = require("./responseMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock});
        
        usuarioMock.setError("findById", new Error("Get one error"));
        
        requestMock.params = {id: 1};
        
        api.getOne(requestMock, responseMock, function(err) {
            expect(err).toEqual(usuarioMock.getError("findById"));
            done();
        });
    });
    
    it("update method", function(done) {
        var usuarioMock = require("./usuarioMock");
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        usuarioMock.setError("save", undefined);
        usuarioMock.setError("findById", undefined);
        usuarioMock.db = [];
        requestMock.body = {nombre: "Pedro", calificacion: 8, id: 3};
        api.save(requestMock, responseMock, null);//ya esta en propiedad bd en usuarioMock.js
        
        var body2 = {nombre: "Juan", calificacion: 9, id: 3}; 
        requestMock.body = body2;
        requestMock.params = {id: 3};
        //se manda body2 para actualizar body.
        api.update(requestMock, responseMock, null);
        expect(responseMock.value.nombre).toBe(body2.nombre);
        expect(responseMock.value.calificacion).toBe(body2.calificacion);
        done();
    });
    
    it("update, save method error", function(done) {
        var usuarioMock = require("./usuarioMock");
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);

        usuarioMock.setError("save", new Error("save error"));
        requestMock.body = {nombre: "Pedro", calificacion: 8, id: 3};
        
        api.save(requestMock, responseMock, function(err) {
            expect(err).toBe(usuarioMock.getError("save"));
            done();
        });      
        
    });
    
    it("update, findById method error", function(done) {
        var usuarioMock = require("./usuarioMock");
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);

        usuarioMock.setError("findById", new Error("findById error"));
        requestMock.body = {nombre: "Pedro", calificacion: 8, id: 3};
        
        api.update(requestMock, responseMock, function(err) {
            expect(err).toBe(usuarioMock.getError("findById"));
            done();
        });         
    });
    
    
    it("delete method", function(done) {
        var usuarioMock = require("./usuarioMock");
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var requestMock = require("./requestMock");
        var responseMock = require("./responseMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        usuarioMock.setError("save", undefined);
        usuarioMock.setError("findById", undefined);
        
        requestMock.body = {nombre: "Luis", calificacion: 2, id: 4};
        
        api.save(requestMock, responseMock, null);
        requestMock.params = {id: 4};
        
        api.delete(requestMock, responseMock, null);
        expect(responseMock.value.nombre).toBe(requestMock.body.nombre);
        expect(responseMock.value.calificacion).
        toBe(requestMock.body.calificacion);
        expect(responseMock.value.id).toBe(requestMock.body.id);
        
        api.getOne(requestMock, responseMock, null);
        expect(responseMock.value).toBeUndefined();
        
        done();
        
    });
    
    it("delete method error", function(done) {
        var usuarioMock = require("./usuarioMock");
        var requestMock = require("./requestMock");
        var responseMock = require("./responseMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock});
        
        //usuarioMock.setError("save", undefined);
        //usuarioMock.setError("findById", undefined);
        usuarioMock.setError("findByIdAndRemove", new Error("findByIdAndRemove error"));
        
        requestMock.params = {id: 4};
        
        api.delete(requestMock, responseMock, function(err) {
            expect(err).toEqual(usuarioMock.getError("findByIdAndRemove"));
            done();
        }); 
    });
    
    it("delete all method", function(done) {
        var usuarioMock = require("./usuarioMock");
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var requestMock = require("./requestMock");
        var responseMock = require("./responseMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        usuarioMock.setError("remove", undefined);
        
        requestMock.body = {nombre: "Luis", calificacion: 2, id: 4};
        api.save(requestMock, responseMock, null);
       
        api.deleteAll(requestMock, responseMock, null);
        expect(responseMock.value).toEqual([]);
        
        done();
        
    });
    
    it("delete all method error", function(done) {
        var usuarioMock = require("./usuarioMock");
        var requestMock = require("./requestMock");
        var responseMock = require("./responseMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock});
        
        usuarioMock.setError("remove", new Error("remove error"));
        
        api.deleteAll(requestMock, responseMock, function(err) {
            expect(err).toEqual(usuarioMock.getError("remove"));
            done();
        }); 
    });
    */
});
