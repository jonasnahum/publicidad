describe("negocio controller", function(){
    var url = 'http://localhost:3000/paginaWeb/api/pages/';
    var negocio = "consultorio";
    var all = [
        {
            id:10,
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
        }
    ];
    
    beforeEach(module('app'));
    
    
    beforeEach(function() {//de donde viende windowMock?
        module(function ($provide) {
            $provide.value('$window', windowMock);
        });
    });
    
    var $controller, $httpMock;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('GET',  url + negocio).respond(all);
    }));

    beforeEach(inject(function($routeParams) {
        $routeParams.negocio = negocio;
    }));

    it('loads page on controller instantiation', function() {
        var controller = $controller('NegocioController');    
        $httpMock.expectGET(url + negocio);
        $httpMock.flush();
        expect(controller.nombre).toEqual(all[0].nombre);
        expect(controller.municipio).toEqual(all[0].direccion.municipio);
        expect(controller.telCliente).toEqual(all[0]._usuario.telCliente);
        expect(controller.rubro).toEqual(all[0].rubro.rubro);
    });
});