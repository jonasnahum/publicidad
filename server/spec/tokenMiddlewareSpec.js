
describe("token middleware", function() {
    it("validate method", function(done){
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
        
        tm.validate(requestMock, responseMock, function(){
            expect(requestMock.user).toEqual(jwtMock.usuario);
            done();    
        });
    });
});