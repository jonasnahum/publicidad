
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
                console.log("paginas");
                console.dir(paginas);
                return res.json(paginas);
            });   
            
    };

    PaginaWebApi.prototype.getByUniqueName = function(req, res, next) {
        var that = this;            
        that.models.usuario.findOne({"uniquename": req.params.uniquename},function(err, usuario){
            if (err) return next(err);
            that.models.paginaWeb.find({"_usuario": usuario._id}).populate('_usuario')//_id of null    
            .exec(function(err, pw){
                if (err) return next(err);
                return res.json(pw);
            });
        })    
        
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

   PaginaWebApi.prototype.update = function(req, res, next) {
        var that = this;
        //uses body to find a user.
        that.models.usuario.findById(req.body.userId, function(err, usuario) {
            if(err)  return next(err);
            //uses body to update user.
            usuario = that.copy.copyBodyToUsuario(req.body, usuario);
            //saves user.
            usuario.save(function(err, usuario){
                if(err)  return next(err);
                //uses params to find a saved page.
                that.models.paginaWeb.findById(req.params.id, function (err, pagina) {
                    if(err) return next(err);
                    //uses body to update the page
                    pagina = that.copy.copyBodyToPagina(req.body, pagina);
                    //saves the page
                    pagina.save(function(err, pag) {
                        if(err)return next(err);
                        res.json(pag);
                    }); 
                });
            });   
        });
    };
    
   PaginaWebApi.prototype.delete = function(req, res, next) {
       var that = this;
       //borra el usuario.
       that.models.usuario.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
           if(err) return next(err);
           that.models.paginaWeb.remove({_usuario: user._id}, function(err, pag) {
               if(err) return next(err);
               res.json(pag);
           });
        });
    }; 
    
//curl -X "DELETE" http://localhost:3000/paginaWeb/api/soloEmpresa/56f2cb60479d8ccf0f9a0370
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
