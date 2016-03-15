describe("Usuario Controller", function() {
    it("getAll", function(done) {
        //se prepara api
        var usuarioMock = require("./usuarioMock");
        usuarioMock.setError ("find", null);//para que no ejecute next en api
        usuarioMock.db = [
            {nombre: "Pedro", calificacion: 9, id: 1}
        ];
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var jwtMock = require("./jwtMock");
        var TokenMiddlewareMock = require("./tokenMiddlewareMock");
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara controller
        var express = require("./expressMock");
        var UsuarioController = require("./../src/usuarioController");
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);

        //se ejecuta el middleware.
        express.executeMiddleware();
    
        //se ejecuta el routehandler.
        express.http('get/');
        expect(express.handlerParams.res.jsonValue).toEqual(usuarioMock.db);
        done();
    });
    it("getAll error", function(done) {
        //se prepara api
        var usuarioMock = require("./usuarioMock");
        usuarioMock.setError ("find", new Error("Test error from controllerSpec"));//para que ejecute next en api
        usuarioMock.db = [
            {nombre: "Pedro", calificacion: 9, id: 1}
        ];
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var jwtMock = require("./jwtMock");
        var TokenMiddlewareMock = require("./tokenMiddlewareMock");
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara controller
        var express = require("./expressMock");
        var UsuarioController = require("./../src/usuarioController");
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);

        //se ejecuta el middleware.
        express.executeMiddleware();
    
        //se ejecuta el routehandler.
        express.http('get/');
        
        expect(express.handlerParams.err).toEqual(usuarioMock.getError("find"));
        done();
    });
    
    
    
    
    
    
    
    it("post", function(done) {
        //se prepara api
        var usuarioMock = require("./usuarioMock");
        var usuarioFactory = require("./usuarioModelFactoryMock");
        var UsuarioApi = require("./../src/usuarioApi");
        var usuarioApi = new UsuarioApi({usuario: usuarioMock}, usuarioFactory);
        
        //se prepara tokenMiddleware
        var jwtMock = require("./jwtMock");
        var TokenMiddlewareMock = require("./tokenMiddlewareMock");
        var tokenMiddlewareMock = new TokenMiddlewareMock({usuario: usuarioMock}, jwtMock);
        
        //se prepara controller 
        var express = require("./expressMock");
        var UsuarioController = require("./../src/usuarioController");
        var controller = new UsuarioController(express, usuarioApi, tokenMiddlewareMock);
        
        //se carga bd
        var body = {nombre: "Jonas para guardar", calificacion: 9, id: 2};
        usuarioMock.db = [];
        express.handlerParams.req.body = body;
        
        //ejecuta el routehandler guardado en la propiedad path.
        express.http('post/');
        
        //se hace el test.
        expect(express.handlerParams.res.jsonValue).
        toEqual(usuarioMock.db [0]);
        done();
    });
});
