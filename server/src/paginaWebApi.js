//falta populate el get y que cuando guarde, guarde un usuario 
var PaginaWebApi = (function() {
    var PaginaWebApi = function(models, paginaWebFactory, copy) {
        this.models = models;
        this.paginaWebFactory = paginaWebFactory;
        this.copy = copy;
    };

    //curl http://localhost:3000/paginaWeb/api/
    PaginaWebApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.paginaWeb.find({}).populate('_usuario')
            .exec(function (err, paginas) {
                if (err) return console.log(err);
            
                console.log(paginas);
            });   
    };

    PaginaWebApi.prototype.getByUniqueName = function(req, res, next) {
        var that = this;
        var name = req.params.uniquename;
        var userId = undefined;
                
        that.models.usuario.findOne({"uniquename": name})    
            .exec(function(err, usuario){
            if (err) return next(err);
            userId = usuario._id;
            
            that.models.paginaWeb.find({"_usuario": userId}).populate('_usuario')    
            .exec(function(err, negocio){
                if (err) return console.log(err);
                console.log("este es la pagina web que resulta despues de la búsqueda a través de _usuario._id");
                console.log(negocio);

                return res.json(negocio);
            });
        });
        
    };
  
    
  // curl -i -H "Content-Type: application/json" -d '{"nombre": "rodriog damian jimenesz","logotipo": "este es un logo", "foto": "este es un fptp","colorBackground": "este es un color", "colorText": "este es un color2", "textoIntro": "bienvenidos", "lat": "4", "long": "4", "descripcion": "cualquiera", "horario": "abrimos todos los dias todos los días", "encargado": "jonas nahum jimenez garcilazo","tel": "4521652247","face": "paginasweburuapan","flickr" : "confeccionescolombia","whats" : "4521652247","link1" : "","link2" : "","email": "jonas@gmail.com","productos": [],"nota": "esta es una nota", "direccion": "justo sierra no 20","rubro": "escolaridad","numero": "2","numeroInt": "33","calle": "justo sierra","colonia": "amapolita","cp": "00060","municipio": "uaruapan","estado": "uruapan","rubro": "purificadoras"}' http://localhost:3000/paginaWeb/api/56cb5f98859069ee22019620
 //ocupa usuarioid en params para poder guardar.
   PaginaWebApi.prototype.save = function(req, res, next){
        var that = this;
        var paginaWeb = that.paginaWebFactory.get();
        paginaWeb = that.copy.copyBodyToEmpresa(req.body, paginaWeb);
        paginaWeb._usuario = req.params.userId;
        paginaWeb.save(function(err, saved) {
            if(err)return console.log(err);
            res.json(saved);
        }); 
   };
    //curl http://localhost:3000/paginaWeb/api/56cb60fc21499c922426a4c7
   PaginaWebApi.prototype.getOne = function(req, res, next) {
        var that = this;  
        that.models.paginaWeb.findOne({ _id: req.params.id })
        .populate('_usuario')
        .exec(function (err, pagina) {
            if (err) return next(err);
            console.log(pagina);
            res.json(pagina);
        });
   };
//curl -X PUT -i -H "Content-Type: application/json" -d '{"nombre": "npmbre cambiado por update","logotipo": "este es un logo", "foto": "este es un fptp","colorBackground": "este es un color", "colorText": "este es un color2", "textoIntro": "bienvenidos", "lat": "4", "long": "4", "descripcion": "cualquiera", "horario": "abrimos todos los dias todos los días", "encargado": "jonas nahum jimenez garcilazo","tel": "4521652247","face": "paginasweburuapan","flickr" : "confeccionescolombia","whats" : "4521652247","link1" : "","link2" : "","email": "jonas@gmail.com","productos": [],"nota": "esta es una nota", "direccion": "justo sierra no 20","rubro": "escolaridad","numero": "2","numeroInt": "33","calle": "justo sierra","colonia": "amapolita","cp": "00060","municipio": "uaruapan","estado": "uruapan","rubro": "purificadoras"}' http://localhost:3000/paginaWeb/api/56cb27e2dfd8dedc17f23887    
   PaginaWebApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.paginaWeb.findById(req.params.id, function (err, pagina) {
            if(err) return next(err);
            pagina = that.copy.copyBodyToEmpresa(req.body, pagina);
            pagina.save(function(err, pag) {
                if(err)return console.log(err);
                console.log(pag);
                res.json(pag);
            }); 
        });
    };

//curl -X "DELETE" http://localhost:3000/paginaWeb/api/56cb27e2dfd8dedc17f23887
   PaginaWebApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.paginaWeb.findByIdAndRemove(req.params.id, function(err, pag) {
            if(err) return next(err);
            res.json(pag);
        }); 
    };      
        
    return PaginaWebApi;
})();

module.exports = PaginaWebApi;
