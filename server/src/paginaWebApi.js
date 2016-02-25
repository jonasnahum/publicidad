
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
                return res.json(paginas);

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
  
   PaginaWebApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.usuario.findById(req.body.userId, function(err, usuario) {
            if(err)  return console.log(err);
            usuario.noContrato = req.body.noContrato;
            usuario.uniquename = req.body.uniquename;
            usuario.cliente = req.body.cliente;
            usuario.telCliente = req.body.telCliente;
            usuario.email = req.body.correoCliente;
            usuario.fechaRegistro = req.body.fechaContrato;
            usuario.fechaVencimiento = req.body.fechaVencimiento;
            usuario.password = req.body.password;
            usuario.pago = req.body.pago;
            usuario.save(function(err, usuario){
                if(err)  return console.log(err);
                that.models.paginaWeb.findById(req.params.id, function (err, pagina) {
                    if(err) return next(err);
                    pagina = that.copy.copyBodyToEmpresa(req.body, pagina);
                    pagina.save(function(err, pag) {
                        if(err)return console.log(err);
                        res.json(pag);
                    }); 
                });
            });   
        });
    };
    

//curl -X "DELETE" http://localhost:3000/paginaWeb/api/56cdd027e853b62c15257774
   PaginaWebApi.prototype.delete = function(req, res, next) {
       var that = this;
       that.models.paginaWeb.findByIdAndRemove(req.params.id, function(err, pag) {
           if(err) return next(err);
           
           console.log("PAGINA");
           console.dir(pag);
           that.models.usuario.findByIdAndRemove(pag._usuario, function(err,usr){
               if(err) return next(err);
               console.log("USUARIO");
               console.dir(usr);
               res.json(usr);
           });
           res.json(pag);
        });
    };      
        
    return PaginaWebApi;
})();

module.exports = PaginaWebApi;
