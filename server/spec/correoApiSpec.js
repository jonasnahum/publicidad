describe("correo api", function() {
        
        var responseMock = require("./responseMock");
        var requestMock = require("./requestMock");
        
        //api
        var CorreoApi = require("./../src/correoApi");
        var nodemailerMock = require("./nodeMailerMock");
        var api = new CorreoApi(nodemailerMock);

    it("send method responds with json ok", function(done){
        //error
        nodemailerMock.setError ("send", null);
        
        //se ejecuta metodo.
        api.send(requestMock, responseMock, null);
        
        //test
        expect(responseMock.value).toEqual({ success: true });
        done();
    });
    it("send method err", function(done){
        //error
        nodemailerMock.setError ("send", new Error("error de correo desde apispec"));
        
        //se ejecuta metodo.
        api.send(requestMock, responseMock, function(err){
            //test
            expect(err).toEqual(nodemailerMock.getError("send"));
            done(); 
        });
    });
});