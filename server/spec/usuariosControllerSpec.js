describe("Usuario Controller", function() {
    /*it("getAll", function(done) {
        //se prepara api
        var usuarioMock = require("./usuarioMock");
        usuarioMock.db = [
            {nombre: "Pedro", calificacion: 9, id: 1}
        ];
        console.log("--------------------------------estos son los usuarios que se le mandan a usuarioApi desde spec");
        console.log(usuarioMock.db);
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
        
        express.handlerParams.req.body.access_token =  "dejenme pasar por favor soy jonas";
        var fecha = Date.now();
        fecha += 1000 * 60 * 60 * 24 * 3;
        jwtMock.fecha = fecha;
        jwtMock.usuario = {nombre: "Primer usuaro que pertenece a jwt, es el que va en el token", calificacion: 9, id: 1};
        

        express.http('get/');
        expect(express.handlerParams.res.jsonValue).toEqual(usuarioMock.db);
        done();
    });*/
    //probar que token solo haga next();
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
        
        //ejecuta el routehandler guardado en la propiedad routes llamado post.
        express.http('post/');
        
        expect(express.handlerParams.res.jsonValue).
        toEqual(usuarioMock.db [0]);
        done();
    });
    
});
