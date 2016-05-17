describe('modelFactory test', function() {
          
        var subdocument = {
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
            },
            _usuario:{
                _id: 55,
                noContrato: '1',
                uniquename: 'jonatoles',
                cliente: 'jonasnahum',
                telCliente: '4521265547',
                email: 'jonasnahum@gmail.com',
                fechaRegistro: '',
                fechaVencimiento: '',
                password: 'el gemelo',
                pago: 2 
            }
        };
        var expected = { 
            nombre: 'jonas', 
            logotipo: 'algun logo', 
            foto: 'alguna foto', 
            colorBackground: 'verde', 
            colorText: 'naranja', 
            textoIntro: 'bienvenidos', 
            lat: 456, 
            long: 454, 
            descripcion: 'una casita muy bonita', 
            horario: 'todos los dias', 
            encargado: 'jonasn jimenez', 
            tel: '4521652247', face: 'jonasnahum', 
            flickr: 'confeccionescolombia', 
            whats: '4521652247', 
            links: [  ], 
            email: 'jonasnahum@gmail.com', 
            productos: [  ], 
            nota: 'ninguna', 
            numero: '3', 
            numeroInt: '3', 
            calle: 'maruata', 
            colonia: 'la cedrera', 
            cp: 15212, municipio: 
            'uruapan', 
            estado: 'michoacan', 
            rubro: 'purificadora', 
            userId: 55, 
            noContrato: '1', 
            uniquename: 'jonatoles', 
            cliente: 'jonasnahum', 
            telCliente: '4521265547', 
            correoCliente: 'jonasnahum@gmail.com', 
            fechaContrato: '', 
            fechaVencimiento: '', 
            pago: 2, 
            password: 'el gemelo'
        };
     var expectedAumentado = { 
            nombre: 'jonas', 
            logotipo: 'algun logo', 
            foto: 'alguna foto', 
            colorBackground: 'verde', 
            colorText: 'naranja', 
            textoIntro: 'bienvenidos', 
            lat: 456, 
            long: 454, 
            descripcion: 'una casita muy bonita', 
            horario: 'todos los dias', 
            encargado: 'jonasn jimenez', 
            tel: '4521652247', face: 'jonasnahum', 
            flickr: 'confeccionescolombia', 
            whats: '4521652247', 
            links: [  ], 
            email: 'jonasnahum@gmail.com', 
            productos: [  ], 
            nota: 'ninguna', 
            numero: '3', 
            numeroInt: '3', 
            calle: 'maruata', 
            colonia: 'la cedrera', 
            cp: 15212, municipio: 
            'uruapan', 
            estado: 'michoacan', 
            rubro: 'purificadora', 
            userId: 55, 
            noContrato: '1', 
            uniquename: 'jonatoles', 
            cliente: 'jonasnahum', 
            telCliente: '4521265547', 
            correoCliente: 'jonasnahum@gmail.com', 
            fechaContrato: '', 
            fechaVencimiento: '', 
            pago: 2, 
            password: 'el gemelo',
            propiedadExtra: 'PROPIEDAD EXTRA',
            propiedadExtra2: 'PROPIEDAD EXTRA2'
        };
    beforeEach(module('app'));
    
    it('get obj from subdocument', inject(function (modelFactory) {
        var mF = modelFactory();
        expect(mF.getObjFromSubdocument(subdocument)).toEqual(expected);
    }));
    it('copy obj to control', inject(function (modelFactory) {
        var mF = modelFactory();
        var obj = {nombre:"jonas", apellido:"jimenez"};
        var ctrl = {};
        var result = mF.copyObjToCtrl(obj,ctrl);
        expect(result).toEqual(obj);
    }));
    it('get model from control', inject(function (modelFactory) {
        var mF = modelFactory();
        var reducido = mF.getModelFromCtrl(expectedAumentado);
        expect(reducido).toEqual(expected);
    }));
});