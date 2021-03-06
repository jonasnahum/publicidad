describe("paginasweb api", function() {
    //model
    var modelMock = require("./modelMock1");//un model trae todos los metodos de búsqueda en la clase, no en el prototype, ahí solo tiene save y la propiedad bd, pero no es una nueva instancia.
    var modelMock2 = require("./modelMock2");
    var modelFactory = require("./paginaWebModelFactoryMock");
    var usuarioFactory = require("./usuarioModelFactoryMock");


    var responseMock = require("./responseMock");
    var requestMock = require("./requestMock");
    
    //api
    var PaginaWebApi = require("./../src/paginaWebApi");
    var UsuarioApi = require("./../src/usuarioApi");

    var copy = require("./copyMock");
    var api = new PaginaWebApi({paginaWeb: modelMock, usuario: modelMock2}, modelFactory, copy);

    var usuarioApi = new UsuarioApi({paginaWeb: modelMock, usuario: modelMock2}, usuarioFactory);//usuariofacturi uses usuarioMock
    
    it("getAll", function(done){
        modelMock.setError("findOne", null);
        modelMock.objetoBuscado = undefined;
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
        expect(modelMock._path).toEqual('_usuario');
        done();
    });
    
    it("getAll method error", function(done) {    
        modelMock.setError ("find", new Error("GetAll method error from paginawebSpec"));
        var next = function(err) {
            expect(err).toEqual(modelMock.getError("find"));
            done();
        };
        api.getAll(null, responseMock, next);
    });
    
    it("gets a page for a given user.uniquename", function(done) {
        //1.- el metodo a testear, primero busca un usuario por uniquename.
        //2.- luego busca una página que en su propiedad _usuario tenga el id del usuario encontrado.
        modelMock.errors = [];
        modelMock.setError ("find", null);
        modelMock.db = [
            {nombreDelaPagina: "aguadelparque", _usuario: 1 }
        ];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;

        modelMock2.errors = [];
        modelMock2.setError ("findOne", null);
        modelMock2.db = [];
        modelMock2.objetoBuscado = undefined;
        modelMock2._path = undefined;
        modelMock2.metodoQueBusca = undefined;
        
        modelMock2.db = [
            {nombre: "Pedro", uniquename: "principito", _id: 1}
        ];
        requestMock.params = {uniquename: "principito"};
        
        api.getByUniqueName(requestMock, responseMock, null);
        expect(responseMock.value).toEqual(modelMock.db[0]);
        expect(modelMock._path).toEqual('_usuario');
        done();
    });
        
    it("findbyuniquename has an error in usuario.findOne so executes next", function(done) {
        //1.- el metodo a testear, primero busca un usuario por uniquename.
        //2.- luego busca una página que en su propiedad _usuario tenga el id del usuario encontrado.
        modelMock.errors = [];
        modelMock.setError ("find", null);
        modelMock.db = [
            {nombreDelaPagina: "aguadelparque", _usuario: 1 }
        ];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;

        modelMock2.errors = [];
        modelMock2.setError ("findOne", new Error("error desde paginawebapispec"));
        modelMock2.db = [];
        modelMock2.objetoBuscado = undefined;
        modelMock2._path = undefined;
        modelMock2.metodoQueBusca = undefined;
        
        modelMock2.db = [
            {nombre: "Pedro", uniquename: "principito", _id: 1}
        ];
        requestMock.params = {uniquename: "principito"};
        
        api.getByUniqueName(requestMock, responseMock, function(err){
            expect(err).toEqual(modelMock2.getError("findOne"));
        });
        done();
    });
    
    
    it("getByUniqueName, paginaWeb.find ERROR", function(done) {
        //1.- el metodo a testear, primero busca un usuario por uniquename.
        //2.- luego busca una página que en su propiedad _usuario tenga el id del usuario encontrado.
        modelMock.errors = [];
        modelMock.setError ("find",  new Error("error desde paginawebapispec GETBYUNQIQUENAME"));
        modelMock.db = [
            {nombreDelaPagina: "aguadelparque", _usuario: 1 }
        ];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;

        modelMock2.errors = [];
        modelMock2.setError ("findOne", null);
        modelMock2.db = [];
        modelMock2.objetoBuscado = undefined;
        modelMock2._path = undefined;
        modelMock2.metodoQueBusca = undefined;
        
        modelMock2.db = [
            {nombre: "Pedro", uniquename: "principito", _id: 1}
        ];
        requestMock.params = {uniquename: "principito"};
        
        
        api.getByUniqueName(requestMock, responseMock, function(err){
            expect(err).toEqual(modelMock.getError("find"));
        });
        done();
    });
    
    it("with a given id , findOne method gets a page", function(done) {
        //1.- el metodo a testear, primero busca un usuario por uniquename.
        //2.- luego busca una página que en su propiedad _usuario tenga el id del usuario encontrado.
        modelMock.errors = [];
        modelMock.setError ("find",null);
        modelMock.db = [
            {nombreDelaPagina: "aguadelparque", _usuario: 1, _id: 15 }
        ];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;

        requestMock.params = {_id: 15};
        
        api.getOne(requestMock, responseMock, null);
        expect(responseMock.value).toEqual(modelMock.db[0]);
        expect(modelMock._path).toEqual('_usuario');
        done();
    });
    
    it("getOne PaginaWebApiSpec Error", function(done) {
        //1.- el metodo a testear, primero busca un usuario por uniquename.
        //2.- luego busca una página que en su propiedad _usuario tenga el id del usuario encontrado.
        modelMock.errors = [];
        modelMock.setError ("findOne", new Error("PaginaWebApiSpec getOne ERROR"));
        modelMock.db = [
            {nombreDelaPagina: "aguadelparque", _usuario: 1, _id: 15 }
        ];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;

        requestMock.params = {_id: 15};
        
        api.getOne(requestMock, responseMock, function(err){
            expect(err).toEqual(modelMock.getError("findOne"));
        });
        done();
    });
       
    it("with a given req.body and userId params, saves a page", function(done) {
        modelMock.errors = [];
        modelMock.setError ("find",null);
        modelMock.db = [];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;
        
        requestMock.body = {
            nombre: "jonas",
            logotipo: "algun logo",
            foto: "alguna foto",
            colorBackground: "verde",
            colorText: "naranja",
            textoIntro: "bienvenidos",
            lat: 456,
            long: 454,
            descripcion: "una casita muy bonita",
            horario: "todos los dias",
            encargado: "jonasn jimenez",
            tel: "4521652247",
            face: "jonasnahum",
            flickr: "confeccionescolombia",
            whats: "4521652247",
            links: [],
            email: "jonasnahum@gmail.com",
            productos: [], 
            nota: "ninguna",
            numero: "3",
            numeroInt: "3",
            calle: "maruata",
            colonia: "la cedrera",
            cp: 15212,
            municipio: "uruapan",
            estado: "michoacan",
            rubro: "purificadora",
        };
        
        requestMock.params = {userId: 15};
        
        api.save(requestMock, responseMock, null);
        expect(responseMock.value).toEqual(modelMock.db[0]);
        done();
    });
    
    it("Save PaginaWebApiSpec error", function(done) {
        modelMock.errors = [];
        modelMock.setError ("save", new Error("Save PaginaWebApiSpec Error"));
        modelMock.db = [];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;
        
        requestMock.params = {userId: 15};
        
        api.save(requestMock, responseMock, function(err) {
            expect(err).toEqual(modelMock.getError("save"));
        });
        done();
    });
    
    it("with a given req.body and page id params, updates a page", function(done) {
        //se guarda una pagina
        modelMock.errors = [];
        modelMock.setError ("save",null);
        modelMock.db = [];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;
        requestMock.body = {
            nombre: "jonas saved by api.save so the document will have the method .save",
            logotipo: "algun logo",
            foto: "alguna foto",
            colorBackground: "verde",
            colorText: "naranja",
            textoIntro: "bienvenidos",
            lat: 456,
            long: 454,
            descripcion: "una casita muy bonita",
            horario: "todos los dias",
            encargado: "jonasn jimenez",
            tel: "4521652247",
            face: "jonasnahum",
            flickr: "confeccionescolombia",
            whats: "4521652247",
            links: [],
            email: "jonasnahum@gmail.com",
            productos: [], 
            nota: "ninguna",
            numero: "3",
            numeroInt: "3",
            calle: "maruata",
            colonia: "la cedrera",
            cp: 15212,
            municipio: "uruapan",
            estado: "michoacan",
            rubro: "purificadora",
            id: 14,
        };
        requestMock.params = {userId: 15};
        api.save(requestMock, responseMock, null);
        
        //se guarda un usuario
        requestMock.body = {
            noContrato: "1",
            uniquename: "maromero",
            cliente: "el meromero",
            telCliente: "4521652248",
            correoCliente: "jonasnahum@gmail.com",
            fechaContrato: Date.now(),
            fechaVencimiento: undefined,
            password: "holahola",
            pago: "1500",
            id: 15
        };
        
        usuarioApi.save(requestMock, responseMock, null);
        
        //se manda un req.body completo con userId y con params.id de la página web to update.
        requestMock.body = {
            noContrato: "neevo",
            uniquename: "neevo",
            cliente: "el neevo",
            telCliente: "neevo",
            correoCliente: "neevo@gmail.com",
            fechaContrato: Date.now(),
            fechaVencimiento: undefined,
            password: "neevo",
            pago: "neevo",
            nombre: "nuevo",
            logotipo: "nuevo logo",
            foto: "nuevo foto",
            colorBackground: "nuevo",
            colorText: "nuevo",
            textoIntro: "nuevo",
            lat: 456,
            long: 454,
            descripcion: "una nuevo muy bonita",
            horario: "todos nuevo dias",
            encargado: "nuevo jimenez",
            tel: "nuevo",
            face: "nuevo",
            flickr: "nuevo",
            whats: "4521652247",
            links: [],
            email: "nuevo@gmail.com",
            productos: [], 
            nota: "nuevo",
            numero: "3",
            numeroInt: "3",
            calle: "maruata",
            colonia: "la nuevo",
            cp: 15212,
            municipio: "nuevo",
            estado: "nuevo",
            rubro: "nuevo",
            userId: 15
        };
        requestMock.params = {id: 14};

        api.update(requestMock, responseMock, null);
        expect(responseMock.value).toEqual(modelMock.db[0]);
        done();
    });
    
    it("PaginaWebApiSpec Update usuario.findById ERROR", function(done) {
        modelMock2.setError("findById", new Error("Setting findById Update method Error"));
        requestMock.params = {id: 14};

        api.update(requestMock, responseMock, function(err) {
            expect(err).toEqual(modelMock2.getError("findById"));
        });
        done();
    });

    it("PaginaWebApiSpec Update usuario.save  ERROR", function(done) {
        modelMock2.setError("findById", null);
        modelMock2.setError("save", new Error("Usuario.Save Update method Error"));
        requestMock.params = {id: 14};

        api.update(requestMock, responseMock, function(err) {
            expect(err).toEqual(modelMock2.getError("save"));
        });
        done();
    });
    
    it("PaginaWebApiSpec Update paginaWeb.findById  ERROR", function(done) {
        modelMock.setError("findById", new Error("PaginaWeb findbyID Err"));
        modelMock2.setError("save", null);
        requestMock.params = {id: 14};

        api.update(requestMock, responseMock, function(err) {
            expect(err).toEqual(modelMock.getError("findById"));
        });
        done();
    });
    
    it("PaginaWebApiSpec Update paginaWeb.save  ERROR", function(done) {
        //se guarda una pagina
        modelMock.errors = [];
        modelMock.setError ("save", new Error("PaginaWeb.Save Update method Error"));
        modelMock.db = [];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;
        requestMock.body = {
            nombre: "jonas saved by api.save so the document will have the method .save",
            logotipo: "algun logo",
            foto: "alguna foto",
            colorBackground: "verde",
            colorText: "naranja",
            textoIntro: "bienvenidos",
            lat: 456,
            long: 454,
            descripcion: "una casita muy bonita",
            horario: "todos los dias",
            encargado: "jonasn jimenez",
            tel: "4521652247",
            face: "jonasnahum",
            flickr: "confeccionescolombia",
            whats: "4521652247",
            links: [],
            email: "jonasnahum@gmail.com",
            productos: [], 
            nota: "ninguna",
            numero: "3",
            numeroInt: "3",
            calle: "maruata",
            colonia: "la cedrera",
            cp: 15212,
            municipio: "uruapan",
            estado: "michoacan",
            rubro: "purificadora",
            id: 14,
        };
        requestMock.params = {userId: 15};
        api.save(requestMock, responseMock, null);
        
        //se guarda un usuario
        requestMock.body = {
            noContrato: "1",
            uniquename: "maromero",
            cliente: "el meromero",
            telCliente: "4521652248",
            correoCliente: "jonasnahum@gmail.com",
            fechaContrato: Date.now(),
            fechaVencimiento: undefined,
            password: "holahola",
            pago: "1500",
            id: 15
        };
        
        usuarioApi.save(requestMock, responseMock, null);
        
        //se manda un req.body completo con userId y con params.id de la página web to update.
        requestMock.body = {
            noContrato: "neevo",
            uniquename: "neevo",
            cliente: "el neevo",
            telCliente: "neevo",
            correoCliente: "neevo@gmail.com",
            fechaContrato: Date.now(),
            fechaVencimiento: undefined,
            password: "neevo",
            pago: "neevo",
            nombre: "nuevo",
            logotipo: "nuevo logo",
            foto: "nuevo foto",
            colorBackground: "nuevo",
            colorText: "nuevo",
            textoIntro: "nuevo",
            lat: 456,
            long: 454,
            descripcion: "una nuevo muy bonita",
            horario: "todos nuevo dias",
            encargado: "nuevo jimenez",
            tel: "nuevo",
            face: "nuevo",
            flickr: "nuevo",
            whats: "4521652247",
            links: [],
            email: "nuevo@gmail.com",
            productos: [], 
            nota: "nuevo",
            numero: "3",
            numeroInt: "3",
            calle: "maruata",
            colonia: "la nuevo",
            cp: 15212,
            municipio: "nuevo",
            estado: "nuevo",
            rubro: "nuevo",
            userId: 15
        };
        requestMock.params = {id: 14};

        api.update(requestMock, responseMock, function(err) {
            expect(err).toEqual(modelMock.getError("save"));
        });
        done();
    });
    
    it("with a given userid  in req.params.id, delete a page", function(done) {
        //se guarda un usuario con su id = 15.
        modelMock2.errors = [];
        modelMock2.db=[{
            noContrato: "1",
            uniquename: "maromero",
            cliente: "el meromero",
            telCliente: "4521652248",
            correoCliente: "jonasnahum@gmail.com",
            fechaContrato: Date.now(),
            fechaVencimiento: undefined,
            password: "holahola",
            pago: "1500",
            _id: 15
        }];

        //se guarda una pagina
        modelMock.errors = [];
        modelMock.setError ("save",null);
        modelMock.db = [];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;
        requestMock.body = {
            nombre: "jonas saved by api.save so the document will have the method .save",
            logotipo: "algun logo",
            foto: "alguna foto",
            colorBackground: "verde",
            colorText: "naranja",
            textoIntro: "bienvenidos",
            lat: 456,
            long: 454,
            descripcion: "una casita muy bonita",
            horario: "todos los dias",
            encargado: "jonasn jimenez",
            tel: "4521652247",
            face: "jonasnahum",
            flickr: "confeccionescolombia",
            whats: "4521652247",
            links: [],
            email: "jonasnahum@gmail.com",
            productos: [], 
            nota: "ninguna",
            numero: "3",
            numeroInt: "3",
            calle: "maruata",
            colonia: "la cedrera",
            cp: 15212,
            municipio: "uruapan",
            estado: "michoacan",
            rubro: "purificadora",
            id: 14,
        };
        requestMock.params = {userId: 15};
        api.save(requestMock, responseMock, null);
        var paginaGuardada = responseMock.value;
        
        //dado un userid, el método tiene que borrar una página.
        requestMock.params = {id: 15};
        api.delete(requestMock, responseMock, null);
        expect(responseMock.value).toEqual(paginaGuardada);
        expect(modelMock.db).toEqual([]);//boorra la pagina
        expect(modelMock2.db).toEqual([]);//borra el usuario
        done();
    });
    
    it("PaginaWebApi delete ERROR usuario.findByIdAndRemove", function(done){
        modelMock2.setError("findByIdAndRemove", new Error("findByIdAndRemove Delete method Error"));
        requestMock.params = {id: 15};

        api.delete(requestMock, responseMock, function(err) {
            expect(err).toEqual(modelMock2.getError("findByIdAndRemove"));
        });
        done();
    });
    
    it("PaginaWebApi delete ERROR paginaWeb.remove", function(done){
        //se guarda un usuario con su id = 15.
        modelMock2.errors = [];
        modelMock2.db=[{
            noContrato: "1",
            uniquename: "maromero",
            cliente: "el meromero",
            telCliente: "4521652248",
            correoCliente: "jonasnahum@gmail.com",
            fechaContrato: Date.now(),
            fechaVencimiento: undefined,
            password: "holahola",
            pago: "1500",
            _id: 15
        }];

        //se guarda una pagina
        modelMock.errors = [];
        modelMock.setError ("save",null);
        modelMock.setError("remove", new Error("Error al eliminar usuario"));
        modelMock.db = [];
        modelMock.objetoBuscado = undefined;
        modelMock._path = undefined;
        modelMock.metodoQueBusca = undefined;
        requestMock.body = {
            nombre: "jonas saved by api.save so the document will have the method .save",
            logotipo: "algun logo",
            foto: "alguna foto",
            colorBackground: "verde",
            colorText: "naranja",
            textoIntro: "bienvenidos",
            lat: 456,
            long: 454,
            descripcion: "una casita muy bonita",
            horario: "todos los dias",
            encargado: "jonasn jimenez",
            tel: "4521652247",
            face: "jonasnahum",
            flickr: "confeccionescolombia",
            whats: "4521652247",
            links: [],
            email: "jonasnahum@gmail.com",
            productos: [], 
            nota: "ninguna",
            numero: "3",
            numeroInt: "3",
            calle: "maruata",
            colonia: "la cedrera",
            cp: 15212,
            municipio: "uruapan",
            estado: "michoacan",
            rubro: "purificadora",
            id: 14,
        };
        requestMock.params = {userId: 15};
        api.save(requestMock, responseMock, null);
        var paginaGuardada = responseMock.value;
        
        //dado un userid, el método tiene que borrar una página.
        requestMock.params = {id: 15};
        
        api.delete(requestMock, responseMock, function(err) {
            expect(err).toEqual(modelMock.getError("remove"));
        });
        done();
    });
});
