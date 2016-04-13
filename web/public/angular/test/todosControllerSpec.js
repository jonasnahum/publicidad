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
    console.log("---------------------------------------hola");
    console.log($httpMock);
    
    
    beforeEach(inject(function($httpBackend, $log, proxyFactory) {
        console.log("---------------------------------------hola");
        console.dir($httpBackend);
        $httpMock = $httpBackend;
        logMock = $log;
        api = proxyFactory(url);
        
        $httpBackend.when('GET', url).respond(alumnos);
    /*    $httpBackend.when('GET', url + id).respond(alumnos[0]);
        $httpBackend.when('DELETE', url + id).respond(true);
        $httpBackend.when('POST', url).respond(true);
        putHandler = $httpBackend.when('PUT', url).respond(true);
        */
        
    }));
    
    
    it('gets all', function() {
        $httpMock.expectGET(url);
        api.getAll(function(data) {                
            expect(data).toEqual(alumnos);
        });
        $httpMock.flush();    
    });
    /*
    it('getOne', function() {
        $httpMock.expectGET(url + id);
        api.getOne(id, function(data) {
            expect(data).toEqual(alumnos[0]);
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
    
    it('save', function() {
        $httpMock.expectPOST(url);
        api.save(alumnos[1], function(data) {
            expect(data).toBe(true);
        });
        $httpMock.flush();
    });
    
    it('update', function() {
        $httpMock.expectPUT(url);
        api.update(alumnos[1], function(data) {
            expect(data).toBe(true);
        });
        $httpMock.flush();
    });
    
    it('server fail', function() {
        logMock.error = function() {
            expect(arguments[0]).toBe('%s %s %s');
            expect(arguments[1]).toBe('PUT');
            expect(arguments[2]).toBe(url);
            expect(arguments[3]).toBe(404);
        };
        
        putHandler.respond(404, 'Not found');
        
        $httpMock.expectPUT(url);
        api.update(alumnos[1], function(data) {
            console.log('no deberia salir este mensaje');
        });
        $httpMock.flush();
    });
    */
});