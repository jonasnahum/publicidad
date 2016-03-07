
describe("usuarios api", function() {
    it("getAll method", function(done){
        var usuarioMock = require("./usuarioMock");//un model trae todos los metodos de búsqueda en la clase no en protorype y la propiedad bd, pero no es una nueva instancia.
        var responseMock = require("./responseMock");
        var UsuarioApi = require("./../src/usuarioApi");
        //var usuarioMock = new Um();
        var api = new UsuarioApi({usuario: usuarioMock});
        
        usuarioMock.db = [
            {nombre: "Jonas", calificacion: 9},
            {nombre: "ro", calificacion: 8}
        ];
        
        api.getAll(null, responseMock, null);
        expect(responseMock.value).toEqual(usuarioMock.db);
        done();
    });
    
  /*  it("getAll method error", function(done) {
        var alumnoMock = require("./alumnoMock");
        var responseMock = require("./responseMock");
        var AlumnosApi = require("./../src/alumnosApi");
        var api = new AlumnosApi({alumno: alumnoMock});
        
        alumnoMock.setError ("find", new Error("GetAll method error"));
        var next = function(err) {
            expect(err).toEqual(alumnoMock.getError("find"));
            done();
        };
        
        api.getAll(null, responseMock, next);
    });    */
});