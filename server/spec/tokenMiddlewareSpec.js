/*
describe("token middleware", function() {
    it("validate metod finds accses token", function(done){
        var usuarioMock = require("./usuarioMock");
         
        var jwtMock = require("./jwtMock");
    
        var TokenMiddleware = require("./../src/tokenMiddleware");
       
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
                
        var tm = new TokenMiddleware({usuario: usuarioMock}, jwtMock);
        requestMock.body = {};
     
        requestMock.body.access_token = "dejenme pasar por favor";
        usuarioMock.db = [{nombre: "Jonas", calificacion: 9}];
        jwtMock.usuario = {nombre: "Jonas", calificacion: 9};
        var fecha = Date.now();
        fecha+= 1000 * 60 * 60 * 24 * 3;
        jwtMock.fecha = fecha;
        
        tm.validate(requestMock, responseMock, function(){
            expect(requestMock.user).toEqual(jwtMock.usuario);
            done();    
        });
    });
    it("validate metod finds does not have accses token", function(done){
        var usuarioMock = require("./usuarioMock");
    
        var jwtMock = require("./jwtMock");
    
        var TokenMiddleware = require("./../src/tokenMiddleware");
       
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
                
        var tm = new TokenMiddleware({usuario: usuarioMock}, jwtMock);
        requestMock.body = {};
     
        requestMock.body.access_token = undefined;
    
        tm.validate(requestMock, responseMock, null);
        expect(responseMock.numero).toEqual(401);
        expect(responseMock.text).toEqual('No token');
        done();    
       
    });
    it("decoded.exp is less than date.now so its error and catch solves the method", function(done){
        var usuarioMock = require("./usuarioMock");
         
        var jwtMock = require("./jwtMock");
    
        var TokenMiddleware = require("./../src/tokenMiddleware");
       
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
                
        var tm = new TokenMiddleware({usuario: usuarioMock}, jwtMock);
        requestMock.body = {};
     
        requestMock.body.access_token = "dejenme pasar por favor";
        usuarioMock.db = [{nombre: "Jonas", calificacion: 9}];
        jwtMock.usuario = {nombre: "Jonas", calificacion: 9};
        var fecha = Date.now();
        tm.validate(requestMock, responseMock, null);
        expect(responseMock.numero).toEqual(401);
        expect(responseMock.text).toEqual('Invalid token');
        done();
    });
});
*/