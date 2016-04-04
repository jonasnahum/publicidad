/*describe("usuarios api", function() {
    var usuarioMock = require("./usuarioMock");//un model trae todos los metodos de búsqueda en la clase, no en el prototype, ahí solo tiene save y la propiedad bd, pero no es una nueva instancia.
    var responseMock = require("./responseMock");
    var UsuarioApi = require("./../src/usuarioApi");
    var api = new UsuarioApi({usuario: usuarioMock});
    var usuarioFactory = require("./usuarioModelFactoryMock");//regresa una nueva instancia de usuarioMock, osea que tiene save en su prototype.
    var requestMock = require("./requestMock");
    
    
    it("getAll method", function(done){
        usuarioMock.db = [
            {nombre: "Jonas", calificacion: 9},
            {nombre: "ro", calificacion: 8}
        ];
        
        usuarioMock.setError ("find", null);
        api.getAll(null, responseMock, null);
        expect(responseMock.value).toEqual(usuarioMock.db);
        done();
    });
    
    it("getAll method error", function(done) {
        usuarioMock.setError ("find", new Error("GetAll method error"));
        var next = function(err) {
            expect(err).toEqual(usuarioMock.getError("find"));
            done();
        };
        api.getAll(null, responseMock, next);
    });
    
    it("save method", function(done) {//will trigger jasmine-node to run the test asynchronously waiting until the done() callback is called.An asynchronous test will fail after 5000 ms if done() is not called. 
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        usuarioMock.setError ("save", null);
        requestMock.body = {nombre: "Juan", calificacion: 8};
        
        api.save(requestMock, responseMock, null);
        expect(responseMock.value.nombre).toBe(requestMock.body.nombre);
        expect(responseMock.value.calificacion).
        toBe(requestMock.body.calificacion);
        done();          
    });
    
    it("save method error", function(done) {
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        usuarioMock.setError("save", new Error("save method error"));
        
        api.save(requestMock, responseMock, function(err){
            expect(err).toEqual(usuarioMock.getError("save"));
            done();
        });
    });
    
    it("getOne method", function(done) {
        usuarioMock.setError ("findById", null);
        usuarioMock.db = [
            {nombre: "Pedro", calificacion: 8, id: 1}
        ];
        requestMock.params = {id: 1};
        
        api.getOne(requestMock, responseMock, null);
        expect(responseMock.value).toEqual(usuarioMock.db[0]);
        done();
    });

    it("getOne method error", function(done) {
        usuarioMock.setError("findById", new Error("Get one error"));
        
        requestMock.params = {id: 1};
        
        api.getOne(requestMock, responseMock, function(err) {
            expect(err).toEqual(usuarioMock.getError("findById"));
            done();
        });
    });
    
    it("update method", function(done) {
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
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);

        usuarioMock.setError("save", new Error("save error"));
        requestMock.body = {nombre: "Pedro", calificacion: 8, id: 3};
        
        api.save(requestMock, responseMock, function(err) {
            expect(err).toBe(usuarioMock.getError("save"));
            done();
        });      
        
    });
    
    it("update, findById method error", function(done) {
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
        var usuarioMock = require("./usuarioMock");
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var requestMock = require("./requestMock");
        var responseMock = require("./responseMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        usuarioMock.setError("save", undefined);
        usuarioMock.setError("findById", undefined);
        usuarioMock.setError("findByIdAndRemove", undefined);
        usuarioMock.db = [];       
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
        var api = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        usuarioMock.setError("remove", undefined);
        
        requestMock.body = {nombre: "Luis", calificacion: 2, id: 4};
        api.save(requestMock, responseMock, null);
       
        api.deleteAll(requestMock, responseMock, null);
        expect(responseMock.value).toEqual([]);
        
        done();
        
    });
    
    it("delete all method error", function(done) {
        usuarioMock.setError("remove", new Error("remove error"));
        
        api.deleteAll(requestMock, responseMock, function(err) {
            expect(err).toEqual(usuarioMock.getError("remove"));
            done();
        }); 
    });
    
});
*/