var UsuariosApi = (function() {
    var UsuariosApi = function(models, usuarioFactory) {
        this.models = models;
        this.usuarioFactory = usuarioFactory;
    };
    
    UsuariosApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        that.models.usuario.find(function (err, usuarios) {
            if (err) return next(err);
            res.json(usuarios);
        });
    };
    
    
    UsuariosApi.prototype.save = function(req, res, next) {
        var that = this;        
        var usuario = that.usuarioFactory.get();   
        for (var property in req.body){
            usuario[property] = req.body[property];
        }
        usuario.save(function(err, usuario){
            if(err)  return console.log(err);
            console.log(usuario);
            res.json(usuario);
        });
    };

    UsuariosApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.usuario.findById(req.params.id, function(err, usuario) {
            if(err)  return console.log(err);
            res.json(usuario);
        });
    };
    
    UsuariosApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.usuario.findById(req.params.id, function(err, usuario) {
            if(err)  return console.log(err);
            for (var property in req.body){
                usuario[property] = req.body[property];
            }
            usuario.save(function(err, usuario){
                if(err)  return console.log(err);
                res.json(usuario);
            });   
        });
    };
    
    UsuariosApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.usuario.findByIdAndRemove(req.params.id, function(err, usuario) {
            if(err) return next(err);
            res.json({status: "ok"});
        });
    };

    UsuariosApi.prototype.deleteAll = function(req, res, next) {
        var that = this;
        that.models.usuario.remove({}, function(err, usuario) {
            if(err) return next(err);
            res.json({status: "all deleted"});
        });
    };
    
    return UsuariosApi;
})();

module.exports = UsuariosApi;