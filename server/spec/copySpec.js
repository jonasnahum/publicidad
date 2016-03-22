// para correr las pruebas, se corre en la consola jasmine-node spec/
describe("Copy Test", function() {
    it("copy body to página", function(done){
        var copy = require("./../src/copy");
        paginaVacia = {};
        body = {
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
            rubro: "purificadora"  
        };
        expected = {
            nombre : "jonas",
            logotipo :  "algun logo",
            foto : "alguna foto",
            colorBackground : "verde",
            colorText : "naranja",
            textoIntro :"bienvenidos",
            lat :  456,
            long :  454,
            descripcion :"una casita muy bonita",
            horario : "todos los dias",
            encargado :"jonasn jimenez",
            tel : "4521652247",
            face :"jonasnahum",
            flickr :"confeccionescolombia",
            whats : "4521652247",
            links : [],
            email : "jonasnahum@gmail.com",
            productos : [],
            nota : "ninguna",
            direccion:{
                numero: "3",
                numeroInt: "3",
                calle: "maruata",
                colonia: "la cedrera",
                cp: 15212,
                municipio: "uruapan",
                estado: "michoacan",
            },
            rubro:{
                rubro: "purificadora" 
            }       
        }
         
        var actual = copy.copyBodyToPagina(body, paginaVacia);
        expect(actual).toEqual(expected);
        done();
    });
    it("copy body to usuario", function(done){
        var copy = require("./../src/copy");
        usuarioVacio = {};
        body = {
            noContrato: "1",
            uniquename: "jonatoles",
            cliente: "jonasnahum",
            telCliente: "4521265547",
            correoCliente: "jonasnahum@gmail.com",
            fechaContrato: "",
            fechaVencimiento: "",
            password: "el gemelo",
            pago: 2,
            propiedadExtra: 123,
            propiedadExtra1: 123,
            propiedadExtra2: 123,
            propiedadExtra3: 123,
            propiedadExtra4: 123
        };
        expected = { 
            noContrato: '1',
            uniquename: 'jonatoles',
            cliente: 'jonasnahum',
            telCliente: '4521265547',
            email: 'jonasnahum@gmail.com',//copy cambia de nombre estas propiedades.
            fechaRegistro: '',
            fechaVencimiento: '',
            password: 'el gemelo',
            pago: 2 
        }

         
        var actual = copy.copyBodyToUsuario(body, usuarioVacio);
        expect(actual).toEqual(expected);
        done();
    });
});