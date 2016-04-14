describe("Usuario Controller", function() {
    //BDD
    var usuarioMock = require("./modelMock2");
    //API
    var usuarioFactory = require("./usuarioModelFactoryMock");
    var UsuarioApi = require("./../src/usuarioApi");
    //TOKEN MIDDLEWARE
    var jwtMock = require("./jwtMock");
    var TokenMiddlewareMock = require("./tokenMiddlewareMock");
    //CONTROLLER
    var express = require("./expressMock");
    var UsuarioController = require("./../src/usuarioController");

    it("getAll", function(done) {
        //se prepara la bd.
        usuarioMock.setError ("find", null);//para que no ejecute next en api
        usuarioMock.db = [
            {nombre: "Pedro", calificacion: 9, id: 1}
        ];
        
        //se prepara api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara controller
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);

        //se ejecuta el middleware.
        express.executeMiddleware();
        
        //se ejecuta el routehandler.
        express.http('get/');
        
        //se hace test.
        expect(express.handlerParams.res.jsonValue).toEqual(usuarioMock.db);
        done();
    });
    it("getAll error", function(done) {
        //se prepara la bd.
        usuarioMock.setError ("find", new Error("Test error from controllerSpec"));//para que ejecute next en api
        usuarioMock.db = [
            {nombre: "Pedro", calificacion: 9, id: 1}
        ];
        
        //se prepara api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara controller
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);

        //se ejecuta el middleware.
        express.executeMiddleware();
    
        //se ejecuta el routehandler.
        express.http('get/');
        
        //se hace test
        expect(express.handlerParams.err).toEqual(usuarioMock.getError("find"));
        done();
    });
    it("post", function(done) {
        //se prepara bd.
        usuarioMock.db = [];
        
        //se prepara Api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara controller 
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);
        
        //se prepara el req.
        express.handlerParams.req.body = {nombre: "Jonas para guardar", calificacion: 9, id: 2};
        
        //ejecuta el routehandler guardado en la propiedad path.
        express.http('post/');
        
        //se hace el test.
        expect(express.handlerParams.res.jsonValue).
        toEqual(usuarioMock.db [0]);
        done();
    });
    it("post error", function(done) {
        //se prepara la bd.
        usuarioMock.db = [];
        usuarioMock.setError ("save", new Error("Post error from controllerSpec"));//para que ejecute next en api
        
        //se prepara api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara el req que entra en los middleware del controller 
        express.handlerParams.req.body = {nombre: "Jonas para guardar", calificacion: 9, id: 2};
        
        //se prepara el controller
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);
        
        //ejecuta el routehandler guardado en la propiedad path.
        express.http('post/');
          
        //se hace el test.
        expect(express.handlerParams.err).//esta propiedad se guarda cuando se api emite res.json();
        toEqual(usuarioMock.getError("save"));
        done();
    });
    it("getOne", function(done) {
        //se prepara la bd.
        usuarioMock.setError ("findById", null);
        usuarioMock.db = [];
        
        //se prepara api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara el controller
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);
        
        //se guarda un registro
        express.handlerParams.req.body = {nombre: "Jonas", calificacion: 9, id: 2};
        express.http('post/');
        
        //se hace getOne al registro guardado.
        express.handlerParams.req.params = {id: 2};
        express.http('get/:id');
        
        expect(express.handlerParams.res.jsonValue).
        toEqual(usuarioMock.db[0]);
        done();
    });
    it("getOne", function(done) {
        //se prepara la bd.
        usuarioMock.setError ("findById", new Error("GetOne error from controllerSpec"));
        usuarioMock.db = [];
        
        //se prepara api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara el controller
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);
        
        //se guarda un registro
        express.handlerParams.req.body = {nombre: "Jonas", calificacion: 9, id: 2};
        express.http('post/');
        
        //se hace getOne al registro guardado.
        express.handlerParams.req.params = {id: 2};
        express.http('get/:id');
        
        expect(express.handlerParams.err).
        toEqual(usuarioMock.getError("findById"));
        done();
    });
    it("put", function(done) {
        //se prepara la bd.
        usuarioMock.setError ("findById", null);//update usa estos dos metodos.
        usuarioMock.setError ("save", null);
        usuarioMock.db = [];
        
        //se prepara api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara el controller
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);
        
        //se guarda un registro
        express.handlerParams.req.body = {nombre: "Jonas", calificacion: 9, id: 2};
        express.http('post/');
        
        //se sobre escribe body y se ejecuta put, el id sigue siendo 2.
        express.handlerParams.req.body.nombre = "Rodrigo";
        express.handlerParams.req.body.calificacion = 10;
        express.handlerParams.req.params = {id: 2};
        express.http('put/:id');
        
        expect(express.handlerParams.res.jsonValue).
        toEqual(usuarioMock.db[0]);
        
        expect(usuarioMock.db[0].nombre).toBe("Rodrigo");
        expect(usuarioMock.db[0].calificacion).toBe(10);
        expect(usuarioMock.db.length).toBe(1);
        done();
    });
    it("delete", function(done) {
        //se prepara la bd.
        usuarioMock.setError ("findByIdAndRemove", null);//update usa estos dos metodos.
        usuarioMock.db = [];
        
        //se prepara api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara el controller
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);
        
        //se guarda un registro
        express.handlerParams.req.body = {nombre: "Jonas", calificacion: 9, id: 2};
        express.http('post/');
        
        var guardado = usuarioMock.db[0];
        
        express.handlerParams.req.params = {id: 2};
        express.http('delete/:id');
        
        expect(express.handlerParams.res.jsonValue).toEqual(guardado);
        expect(usuarioMock.db.length).toBe(0); 
        done();
    });
    it("delete error", function(done) {
        //se prepara la bd.
        usuarioMock.setError ("findByIdAndRemove",  new Error("test error"));
        usuarioMock.db = [];
        
        //se prepara api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara el controller
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);
        
        //se guarda un registro
        express.handlerParams.req.body = {nombre: "Jonas", calificacion: 9, id: 2};
        express.http('post/');
        
        var guardado = usuarioMock.db[0];
        
        express.handlerParams.req.params = {id: 2};
        express.http('delete/:id');
        
        expect(express.handlerParams.err).toEqual(usuarioMock.getError("findByIdAndRemove")); 
        done();
    });
    it("delete All", function(done) {
        //se prepara la bd.
        usuarioMock.setError ("findByIdAndRemove", null);//update usa estos dos metodos.
        usuarioMock.db = [];
        
        //se prepara api
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara el controller
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);
        
        //se guardan varios registros
        express.handlerParams.req.body = {nombre: "Jonas", calificacion: 9, id: 2};
        express.http('post/');
        express.handlerParams.req.body = {nombre: "pedro", calificacion: 10, id: 3};
        express.http('post/');
        express.handlerParams.req.body = {nombre: "Juan", calificacion: 6, id: 1};
        express.http('post/');
        
        var arrayVacio = [];
        
        express.http('delete/peligro/deleteAll');

        expect(usuarioMock.db.length).toBe(0); 
        done();
    });
});
