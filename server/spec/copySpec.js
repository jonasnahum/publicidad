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
            link1: "algun link",
            link2: "algun link2",
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
            link1 :"algun link",
            link2 : "algun link2",
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
    
});