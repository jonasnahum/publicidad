describe("editar controller", function(){
    var url = 'http://localhost:3000/paginaWeb/api/';
    var id = 10;
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
    

    beforeEach(function() {
        module(function ($provide) {
            $provide.value('$window', windowMock);//de donde viende windowMock?
        });
    });
    
    var $controller, $httpMock, $locationCaptured;

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));
    
    beforeEach(inject(function($httpBackend) {
        $httpMock = $httpBackend;
        $httpBackend.when('GET',  url + id).respond(all[0]);
        $httpBackend.when('PUT', url + id).respond(true);
    }));
    
    
    beforeEach(inject(function($location) {
        $locationCaptured = $location;
    }));

    beforeEach(inject(function($routeParams) {
        $routeParams.id = id;
    }));

    
    it('loads pagina on controller instantiation', function() {
        var controller = $controller('EditarFormularioController');    
        
        controller.nombre = 'Rodrigo';
        controller.id = id;
        
        $httpMock.expectGET(url + id);
        $httpMock.flush();        
        
        expect(controller.nombre).toEqual(all[0].nombre);
        expect(controller.id).toEqual(id);
        
    });
    
    it('changes location on update', function() {
        var controller = $controller('EditarFormularioController');
        
        //getOne
        $httpMock.expectGET(url + id);
        $httpMock.flush();
        
        controller.editar();
        $httpMock.expectPUT(url + id);
        $httpMock.flush();
        
        expect($locationCaptured.path()).toBe('/privado/todos');
        
    });
    
});