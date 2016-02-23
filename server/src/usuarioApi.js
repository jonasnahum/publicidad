var UsuariosApi = (function() {
    var UsuariosApi = function(models, usuarioFactory, moment, jwt) {
        this.models = models;
        this.usuarioFactory = usuarioFactory;
        
        this.moment = moment.module;
        this.jwt = jwt.module;
    };
    
    UsuariosApi.prototype.validationErrMessages = function(err){
        Object.keys(err.errors).forEach(function(key) {
            var message = err.errors[key].message;
            console.log('Validation error for "%s": %s', key, message);
        });
    };
    //curl -i -H "Content-Type: application/json" -d '{"cliente":"Maria Jones","uniquename":"jones","telCliente":"234567","noContrato":"02","fechaRegistro":"2015-11-10","fechaVencimiento":"2015/01/09","pago":"10","email":"jones@gmail.com","password":"4321"}' http://localhost:3000/usuario/api/
    UsuariosApi.prototype.save = function(req, res, next) {
        var that = this;        
        var usuario = that.usuarioFactory.get();   
        
        for (var property in req.body){
            usuario[property] = req.body[property];
        }
        usuario.save(function(err, usuario){
            if(err) return that.validationErrMessages(err);
            res.json(usuario);
        });
    };
    // curl http://localhost:3000/usuarios/api/
    UsuariosApi.prototype.getAll = function(req, res, next) {
        var that = this;
        
        that.models.usuario.find({}, function(err, usuarios) {
            if(err) return that.validationErrMessages(err);
            res.json(usuarios);
        });
    };
    ////curl http://localhost:3000/usuarios/api/56461263510dc1af0f9a32bf
    UsuariosApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.usuario.findById(req.params.id, function(err, usuario) {
            if(err) return that.validationErrMessages(err);
            res.json(usuario);
        });
    };
    //curl -X PUT -i -H "Content-Type: application/json" -d '{"cliente":"Lupita Jones","uniquename":"Lupita","telCliente":"12345","noContrato":"02","fechaRegistro":"2015-11-10","fechaVencimiento":"2015/01/09","pago":"1100","email":"jones@gmail.com","password":"4321"}' http://localhost:3000/usuarios/api/ 5646467e83540be61605d680
    UsuariosApi.prototype.update = function(req, res, next) {
        var that = this;
        
        that.models.usuario.findById(req.params.id, function(err, usuario) {
            if(err) return that.validationErrMessages(err);
            
            for (var property in req.body){
                usuario[property] = req.body[property];
            }
            usuario.save(function(err, usuario){
                if(err) return that.validationErrMessages(err);
                res.json(usuario);
            });   
        });
    };
    //curl -X "DELETE" http://localhost:3000/usuarios/api/5646400628346fef1513c651
    UsuariosApi.prototype.delete = function(req, res, next) {
        var that = this;
        
        that.models.usuario.findByIdAndRemove(req.params.id, function(err, usuario) {
            if(err) return next(err);
            res.json({status: "ok"});
        });
    };
    //curl http://localhost:3000/usuarios/api//pages/Lupita
    UsuariosApi.prototype.getByUniqueName = function(req, res, next) {
        var that = this;
        var name = req.params.uniquename;
        
        that.models.usuario.findOne({"uniquename": name})    
            .exec(function(err, usuario){
            if (err) return next(err);
            return res.json(usuario);
        });
    };
    
    return UsuariosApi;
})();

module.exports = UsuariosApi;