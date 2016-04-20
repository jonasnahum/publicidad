describe("Api Proxy", function() {
    var url = '/alumnos/api/';
    var id = 1;
    var alumnos = [
        {nombre: 'Jonas', calificacion: 9},
        {nombre: 'Rodrigo', calificacion: 8},
        {nombre: 'Monserrat', calificacion: 7}
    ];
    
    beforeEach(module('app'));
    
    var $httpMock = undefined;
    var api = undefined;
    var logMock = undefined;
    var putHandler;
    
    beforeEach(inject(function($httpBackend, $log, proxyFactory) {
        
        $httpMock = $httpBackend;
        logMock = $log;
        api = proxyFactory(url);
        
        $httpBackend.when('GET', url).respond(alumnos);
        $httpBackend.when('GET', url + 'pages/' + 'Jonas').respond(alumnos[0]);
        $httpBackend.when('GET', url + id).respond(alumnos[0]);
        $httpBackend.when('POST', url).respond(true);
        $httpBackend.when('POST', url + id).respond(true);
        putHandler = $httpBackend.when('PUT', url + id).respond(true);
        $httpBackend.when('DELETE', url + id).respond(true); 
        
    }));
    
    
    it('gets all', function() {
        $httpMock.expectGET(url);
        api.getAll(function(data) {                
            expect(data).toEqual(alumnos);
        });
        $httpMock.flush();    
    });
    
    it('gets by uniquename', function() {
        $httpMock.expectGET(url + 'pages/' + 'Jonas');
        api.getByUniqueName('Jonas', function(data) {                
            expect(data).toEqual(alumnos[0]);
        });
        $httpMock.flush();    
    });
    
    it('getOne', function() {
        $httpMock.expectGET(url + id);
        api.getOne(id, function(data) {
            expect(data).toEqual(alumnos[0]);
        });
        $httpMock.flush();
    });
    
    it('save', function() {
        $httpMock.expectPOST(url);
        api.save(alumnos[1], function(data) {
            expect(data).toBe(true);
        });
        $httpMock.flush();
    });
    
    it('update', function() {
        $httpMock.expectPUT(url + id);
        api.update(id, alumnos[1], function(data) {
            expect(data).toBe(true);
        });
        $httpMock.flush();
    });
    
    
    it('delete', function() {
        $httpMock.expectDELETE(url + id);
        api.delete(id, function(data) {
            expect(data).toBe(true);
        });
        $httpMock.flush();
    });
    
    it('server fail', function() {
        logMock.error = function() {
            expect(arguments[0]).toBe('%s %s %s');
            expect(arguments[1]).toBe('PUT');
            expect(arguments[2]).toBe(url + id);
            expect(arguments[3]).toBe(404);
        };
        
        putHandler.respond(404, 'Not found');
        
        $httpMock.expectPUT(url + id);
        api.update(id, alumnos[1], function(data) {
            console.log('no deberia salir este mensaje');
        });
        $httpMock.flush();
    });
    
    it('signup publico hace lo mismo que save', function() {
        $httpMock.expectPOST(url);
        api.signupPublico(alumnos[1], function(data) {
            expect(data).toBe(true);
        });
        $httpMock.flush();
    });
        
    it('save publico guarda con id', function() {
        $httpMock.expectPOST(url + id);
        api.savePublico(id, alumnos[1], function(data) {
            expect(data).toBe(true);
        });
        $httpMock.flush();
    });
    
});