
var PaginaWebApi = (function() {
    var PaginaWebApi = function(models, paginaWebFactory, copy) {
        this.models = models;
        this.paginaWebFactory = paginaWebFactory;
        this.copy = copy;
    };

    PaginaWebApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.paginaWeb.find().populate('_usuario')
            .exec(function (err, paginas) {
                if (err) return next(err);
                return res.json(paginas);
            });   
    };

    PaginaWebApi.prototype.getByUniqueName = function(req, res, next) {
        var that = this;            
        that.models.usuario.findOne({"uniquename": req.params.uniquename},function(err, usuario){
            if (err) return next(err);
            that.models.paginaWeb.find({"_usuario": usuario._id}).populate('_usuario')    
            .exec(function(err, pw){
                if (err) return next(err);
                return res.json(pw);
            });
        })    
        
    };
      
   PaginaWebApi.prototype.save = function(req, res, next){
        var that = this;
        var paginaWeb = that.paginaWebFactory.get();
        paginaWeb = that.copy.copyBodyToPagina(req.body, paginaWeb); 
        paginaWeb._usuario = req.params.userId;
        paginaWeb.save(function(err, saved) {
            if(err)return console.log(err);
            res.json(saved);
        }); 
   };

    PaginaWebApi.prototype.getOne = function(req, res, next) {
        var that = this;  
        that.models.paginaWeb.findOne({ _id: req.params.id })
        .populate('_usuario')
        .exec(function (err, pagina) {
            if (err) return next(err);
            res.json(pagina);
        });
   };
  
   PaginaWebApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.usuario.findById(req.body.userId, function(err, usuario) {
            if(err)  return console.log(err);
            usuario = that.copy.copyBodyToUsuario(req.body,usuario);
            usuario.save(function(err, usuario){
                if(err)  return console.log(err);
                that.models.paginaWeb.findById(req.params.id, function (err, pagina) {
                    if(err) return next(err);
                    pagina = that.copy.copyBodyToPagina(req.body, pagina);
                    pagina.save(function(err, pag) {
                        if(err)return console.log(err);
                        res.json(pag);
                    }); 
                });
            });   
        });
    };
    
   PaginaWebApi.prototype.delete = function(req, res, next) {
       var that = this;
       var userId = req.params.id;
       that.models.usuario.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
           if(err) return next(err);           
           that.models.paginaWeb.remove({_usuario: userId}, function(err, pag) {
               if(err) return next(err);
               res.json(pag);
           });
        });
    }; 
    
//curl -X "DELETE" http://localhost:3000/paginaWeb/api/soloEmpresa/56cc7ca658b9e39d1196c6b4
   PaginaWebApi.prototype.deleteSoloEmpresa = function(req, res, next) {
       var that = this;
       that.models.paginaWeb.remove({_id: req.params.id}, function(err, pag) {
               if(err) return next(err);
               res.json(pag);
       });
    };   
    return PaginaWebApi;
})();

module.exports = PaginaWebApi;
