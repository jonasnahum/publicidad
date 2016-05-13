describe("Correo controller Controller", function() {
    var CorreoApi = require("./../src/correoApi");
    var nodemailerMock = require("./nodeMailerMock");
    correoApi = new CorreoApi(nodemailerMock);
    //se prepara controller
    var express = require("./expressMock");
    var CorreoController = require("./../src/correoController");
    var controller = new CorreoController(express, correoApi);
    it("post", function(done) {
        //se prepara bd.
        nodemailerMock.setError ("send", null);//para que no ejecute next en api
        
        //se prepara el req.
        var cuerpo = {
                        name: "Jonas para guardar", 
                        email: "weburuapan@gmail.com",
                        phone: 4521652247,
                        message: "hola mensaje desde spec",
                        to: "Maria mercedes"
                     };  
        express.handlerParams.req.body = cuerpo;      
        
        //ejecuta el routehandler guardado en la propiedad path.
        express.http('post/');
        
        //se hace el test.
        expect(express.handlerParams.res.jsonValue).toEqual({ success : true });
        expect(nodemailerMock.mailOptions.from).toEqual(cuerpo.email);
        expect(nodemailerMock.mailOptions.subject).toEqual("Páginas Web Uruapan");
        expect(nodemailerMock.mailOptions.text).toEqual(cuerpo.message);
        expect(nodemailerMock.mailOptions.to).toEqual(cuerpo.to);
        done();
    })

    it("post Error", function(done) {
        //se prepara bd.
        nodemailerMock.setError ("send", new Error("correoControllerSpec Post Error"));//para que no ejecute next en api
        
        //se prepara el req.
        var cuerpo = {
                        name: "Jonas para guardar", 
                        email: "pedrito@gmail.com",
                        phone: 4521652247,
                        message: "hola mensaje desde spec",
                        to: "Maria mercedes"
                     };  
        express.handlerParams.req.body = cuerpo;      
        
        //ejecuta el routehandler guardado en la propiedad path.
        express.http('post/');
        
        expect(express.handlerParams.err).toEqual(nodemailerMock.getError("send"));
        done();
    });

});
