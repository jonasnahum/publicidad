describe("Admin Controller", function() {
    var modelMock = require("./modelExperimentMock");
    //var modelFactory = require("./usuarioModelFactoryMock");
    var modelFactory = require("./paginaWebModelFactoryMock");
    //se prepara api
    var AdminApi = require("./../src/adminApi");
    var jwt = require("./jwtMock");
    var moment = require("./momentMock");
    
    var adminApi = new AdminApi({admin: modelMock}, modelFactory, moment, jwt);

    //se prepara controller
    var express = require("./expressMock");
    var AdminController = require("./../src/adminController");
    
    var controller = new AdminController(express, adminApi);
    it("getAll", function(done) {
        //se prepara la bd.
        modelMock.setError ("find", null);//para que no ejecute next en api
        modelMock.db = [
            {nombre: "Pedro", calificacion: 9, id: 1}
        ];
        //se ejecuta el routehandler.
        express.http('get/');
        //se hace test.
        expect(express.handlerParams.res.jsonValue).toEqual(modelMock.db);
        done();
    });
    it("getAll error", function(done) {
        //se prepara la bd.
        modelMock.setError ("find", new Error("Test getall error from adminSpec"));//para que ejecute next en api
        modelMock.db = [
            {nombre: "Pedro", calificacion: 9, id: 1}
        ];
        //se ejecuta el routehandler.
        express.http('get/');
        //se hace test
        expect(express.handlerParams.err).toEqual(modelMock.getError("find"));
        done();
    });
    it("post/signup", function(done) {
        //se prepara bd.
        modelMock.setError ("save", null);//para que no ejecute next en api
        modelMock.db = [];
        
        //se prepara el req.
        express.handlerParams.req.body = {nombre: "Jonas para guardar", calificacion: 9, id: 2};
        
        //ejecuta el routehandler guardado en la propiedad path.
        express.http('post/signup');
        
        //se hace el test.
        expect(express.handlerParams.res.jsonValue).
        toEqual(modelMock.db [0]);
        done();
    });
    it("post/signup error", function(done) {
        //se prepara la bd.
        modelMock.db = [];
        modelMock.setError ("save", new Error("Post error from adminSpec"));//para que ejecute next en api
        
        //se prepara el req que entra en los middleware del controller 
        express.handlerParams.req.body = {nombre: "Jonas para guardar", calificacion: 9, id: 2};
            
        //ejecuta el routehandler guardado en la propiedad path.
        express.http('post/signup');
          
        //se hace el test.
        expect(express.handlerParams.err).//esta propiedad se guarda cuando se api emite res.json();
        toEqual(modelMock.getError("save"));
        done();
    });
    it("post/signin", function(done) {
        //se prepara bd.
        modelMock.setError ("save", null);//para que no ejecute next en api
        modelMock.db = [{nombre: "Jonas para guardar", email: "jonasnahum@gmail.com", calificacion: 9, id: 2}];
        
        //se prepara el req.
        express.handlerParams.req.body = { email: "jonasnahum@gmail.com", password: "passunique" };
        
        //ejecuta el routehandler guardado en la propiedad path.
        express.http('post/signin');
        
        //se hace el test.
        expect(express.handlerParams.res.jsonValue.user).
        toEqual(modelMock.db [0]);
        done();
    });
    it("post/signin fails", function(done) {
        //se prepara bd.
        modelMock.setError ("findOne", new Error("findone error from admin controller spec"));//el metodo fidbyemail, usa findone.
        modelMock.db = [{nombre: "Jonas para guardar", email: "jonasnahum@gmail.com", calificacion: 9, id: 2}];
        
        //se prepara el req.
        express.handlerParams.req.body = { email: "jonasnahum@gmail.com", password: "passunique" };
        
        //ejecuta el routehandler guardado en la propiedad path.
        express.http('post/signin');
        
        //se hace el test.
        expect(express.handlerParams.err).
        toEqual(modelMock.getError("findOne"));
        done();
    });
  
    it("delete", function(done) {
        modelMock.setError ("findByIdAndRemove", null);//update usa estos dos metodos.
        modelMock.db = [{nombre: "Jonas", calificacion: 9, id: 2}];
            
        var guardado = modelMock.db[0];
        
        express.handlerParams.req.params = {id: 2};
        express.http('delete/:id');

        expect(express.handlerParams.res.jsonValue).toEqual(guardado);
        expect(modelMock.db.length).toBe(0); 
        done();
    });
    it("delete error", function(done) {
        //se prepara la bd.
        modelMock.setError ("findByIdAndRemove",  new Error("test error delete on admincontroller spec"));
        modelMock.db = [{nombre: "Jonas", calificacion: 9, id: 2}];
        
        var guardado = modelMock.db[0];
        
        express.handlerParams.req.params = {id: 2};
        express.http('delete/:id');
        
        expect(express.handlerParams.err).toEqual(modelMock.getError("findByIdAndRemove")); 
        done();
    });
    it("delete All", function(done) {
        //se prepara la bd.
        modelMock.setError ("remove", null);//update usa estos dos metodos.
        modelMock.db = [
            {nombre: "Jonas", calificacion: 9, id: 2},
            {nombre: "pedro", calificacion: 10, id: 3},
            {nombre: "Juan", calificacion: 6, id: 1}
        ];
        
        var arrayVacio = [];
        
        express.http('delete/borrarTodosPeligro');

        expect(modelMock.db.length).toBe(0); 
        done();
    });
    it("delete All error", function(done) {
        //se prepara la bd.
        modelMock.setError ("remove", new Error("remove from admincontroller spec"));//update usa estos dos metodos.
        modelMock.db = [
            {nombre: "Jonas", calificacion: 9, id: 2},
            {nombre: "pedro", calificacion: 10, id: 3},
            {nombre: "Juan", calificacion: 6, id: 1}
        ];
        
        express.http('delete/borrarTodosPeligro');

        expect(express.handlerParams.err).toEqual(modelMock.getError("remove"));
        done();
    });
});
