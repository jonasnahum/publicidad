var AdminApi = (function() {
    var AdminApi = function(models, adminFactory, moment, jwt) {
        this.models = models;
        this.adminFactory = adminFactory;
        
        this.moment = moment.module;
        this.jwt = jwt.module;
    };
    AdminApi.prototype.findByEmail = function(req, res, next) {
        var that = this;
        that.models.admin.findOne({ email: req.body.email}, function(err, administrador) {
            if(err) {
                console.log("huboerror");
                return next(err);
            }

            if (!administrador) {
                // incorrect username
                console.log("no encontró el administrador");
                return res.sendStatus(401);
            }

            /*if (user.password !== req.body.password) {
                // incorrect password
                return res.sendStatus(401);
            }*/
            if (req.body.password !== 'passunique') {
                // incorrect password
                console.log("passunique mal escrito");
                return res.sendStatus(401);
            }

            var expires = that.moment().add(120, 'minutes').valueOf();
            var token = that.jwt.encode({
                iss: administrador.email,
                exp: expires
            }, 'cualquiera');

            console.log({
                token : token,
                expires: expires,
                user: administrador
            });
            res.json({
                token : token,
                expires: expires,
                user: administrador
            });
        });
    };
    //curl -i -H "Content-Type: application/json" -d '{"email":"jonas@gmail.com", "password":"4321"}' http://localhost:3000/admin/api/
    AdminApi.prototype.save = function(req, res, next) {
        var that = this;        
        var admin = that.adminFactory.get();   
        
        for (var property in req.body){
            admin[property] = req.body[property];
        }
        admin.save(function(err, admin){
            if(err)  return console.log(err);
            res.json(admin);
        });
    }; 
    // curl http://localhost:3000/admin/api/
    AdminApi.prototype.getAll = function(req, res, next) {
        var that = this;
        
        that.models.admin.find({}, function(err, admins) {
            if(err)  return console.log(err);
            res.json(admins);
        });
    };
     
    ////curl http://localhost:3000/admin/api/56cb5f98859069ee22019620
    AdminApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.admin.findById(req.params.id, function(err, admin) {
            if(err)  return console.log(err);
            res.json(admin);
        });
    };
    //curl -X PUT -i -H "Content-Type: application/json" -d '{"email":"jonas@gmail.com", "password":"4321"}' http://localhost:3000/admin/api/ 5646467e83540be61605d680
    AdminApi.prototype.update = function(req, res, next) {
        var that = this;
        
        that.models.admin.findById(req.params.id, function(err, admin) {
            if(err)  return console.log(err);
            
            for (var property in req.body){
                admin[property] = req.body[property];
            }
            admin.save(function(err, usuario){
                if(err)  return console.log(err);
                res.json(usuario);
            });   
        });
    };
    //curl -X "DELETE" http://localhost:3000/admin/api/5646400628346fef1513c651
    AdminApi.prototype.delete = function(req, res, next) {
        var that = this;
        
        that.models.admin.findByIdAndRemove(req.params.id, function(err, ad) {
            if(err) return next(err);
            res.json({status: "ok"});
        });
    };
    //curl -X "DELETE" http://localhost:3000/usuarios/api/delete
    /*UsuariosApi.prototype.delete = function(req, res, next) {
        var that = this;
        
        that.models.usuario.remove({}, function(err, usuario) {
            if(err) return next(err);
            res.json({status: "deleted all"});
        });
    };*/
    
    return AdminApi;
})();

module.exports = AdminApi;
