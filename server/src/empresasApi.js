var EmpresasApi = (function() {
    var EmpresasApi = function(models, empresaFactory, copy) {
        this.models = models;
        this.empresaFactory = empresaFactory;
        this.copy = copy;
    };
    
    EmpresasApi.prototype.validationErrMessages = function(err){
        Object.keys(err.errors).forEach(function(key) {
            var message = err.errors[key].message;
            console.log('Validation error for "%s": %s', key, message);
        });
    };/*
    EmpresasApi.prototype.getAll = function(req, res, next) {
        var that = this;              
        that.models.empresa.find({}, function (err, empresas) {
            if (err) return console.log(err);
            
            console.log("GET ALL SERVER");
            console.dir(empresas);
            that.models.usuario.find({}, function(err, usuarios){
                if (err) return console.log(err);
                console.log("GET ALL SERVER USUARIOS");
                console.dir(usuarios);
                //res.json(usuarios);
            })/*.select('uniquename')/;
            //res.json(empresas);
        })
            //.select('nombre logotipo descripcion informacion.uniquename')
            .select('nombre logotipo descripcion')
            .skip(req.body.requestedPageNumber*req.body.myPageItemsCount)
            .limit(req.body.myPageItemsCount);
    };*/
    
    
    EmpresasApi.prototype.getAll = function(req, res, next) {
        var that = this;              
        that.models.empresa.find({}, function (err, empresas) {
            if (err) return console.log(err);
            
            console.log("GET ALL SERVER");
            console.dir(empresas);
            /*that.models.usuario.find({}, function(err, usuarios){
                if (err) return console.log(err);
                console.log("GET ALL SERVER USUARIOS");
                console.dir(usuarios);
                //res.json(usuarios);
            }).select('uniquename')*/;
            res.json(empresas);
        }).populate('uniquename')
            .select('nombre logotipo descripcion')
            .skip(req.body.requestedPageNumber*req.body.myPageItemsCount)
            .limit(req.body.myPageItemsCount);
    };
    
    
    
   /* EmpresasApi.prototype.save = function(req, res, next){
        var that = this;
        var empresa = that.empresaFactory.get();
        empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
        empresa.save(function(err, empresa) {
            if(err) return that.validationErrMessages(err);
        }); 
        res.json(empresa);
    };
*/
  //  EmpresasApi.prototype.savePublico = function(req, res, next){
    /*EmpresasApi.prototype.save = function(req, res, next){
        var that = this;
        var empresa = that.empresaFactory.get();
        empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
        var emp = empresa;
        //console.log("EMPRESA.SAVE emrpesa");
        //console.dir(empresa);
        empresa.save(function(err, emp) {
            console.log("RECIBE EMPRESA ERROR");
            console.dir(err);
            if(err) return that.validationErrMessages(err);
            console.log("Empresa.save");
            console.dir(empresa);
                    
            
            console.log("RETORNA EMPRESA");
            console.dir(empresa);
            res.json(empresa);
        }); 
        //res.json(empresa);
        /*
        var user = req.body.user; 
        console.log("body.user: " + user);
        that.models.usuario.findByEmail({user}, function(err, usuario) {
            if (err) return console.log(err);

            console.log("UsuarioFindByEmail")
            usuario.paginaWeb.push(empresa);
            usuario.save(function(err, usuario){
                if(err) console.log(err);
                console.log("Pushed empresa con exito");
                console.dir(usuario);
                //res.json({success: true});
            });
        });
        ///*
    };*/
    /*EmpresasApi.prototype.save = function(req, res, next){
        var that = this;
        console.log("body.userID: " + req.body.userId);
        //Eliminar findByID primero guardar empresa y despues push
        that.models.usuario.findById(req.body.userId, function(err, usuario) {
            if (err) return console.log(err);
            
            var empresa = that.empresaFactory.get();
            empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
            var emp = empresa;
            console.log("EMPRESA.SAVE emrpesa");
            console.dir(empresa);
            
            usuario.paginaWeb.push(empresa);
            
            usuario.save(function (err) {
                if(err) console.log(err);
            
                empresa.save(function(err, emp) { 
                if(err) {
                    console.log("RECIBE EMPRESA ERROR");
                    return that.validationErrMessages(err);}
                  console.log("Empresa.save");
                    console.dir(empresa);

                //console.log("RETORNA EMPRESA");
                //console.dir(empresa);
                //---res.json(empresa);
                }); 

                //res.json({success: true});

            });
        });
        
        //res.json(empresa);
        
    };
    
    */
    
    
    EmpresasApi.prototype.save = function(req, res, next){
        var that = this;
        console.log("body.userID: " + req.body.userId);
        //Eliminar findByID primero guardar empresa y despues push
        that.models.usuario.findById(req.body.userId, function(err, usuario) {
            if (err) return console.log(err);
            
            var empresa = that.empresaFactory.get();
            empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
            var emp = empresa;
            //console.log("EMPRESA.SAVE emrpesa");
            //console.dir(empresa);
            
            usuario.paginaWeb.push(empresa);
            console.log("Usuario antes de save");
            console.dir(usuario.paginaWeb);
            
            usuario.save(function (err) {
                if(err) console.log(err);
                
                console.log("USUARIO dentro de SAVE");
                empresa.save(function(err, emp) { 
                    if(err) {
                        console.log("RECIBE EMPRESA ERROR");
                        return that.validationErrMessages(err);
                    }
                    console.log("Empresa.save");
                    console.dir(empresa);
                }); 
            });
            
        });        
    };
    
    
    EmpresasApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.empresa.findOne({ _id: req.params.id })
        .exec(function(err, empresa){
            if (err) return next(err);
            return res.json(empresa);
        });
    };
     /*USUARIOS UNIQUENAME
    EmpresasApi.prototype.getByUniqueName = function(req, res, next) {
        var that = this;
        var name = req.params.uniquename;
        
        that.models.empresa.findOne({"informacion.uniquename": name})    
            .exec(function(err, empresa){
            if (err) return next(err);
            return res.json(empresa);
        });
    };
    */
    EmpresasApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.empresa.findById(req.params.id, function (err, empresa) {
            if(err) return next(err);
            empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
            empresa.save(function(err, empresa) {
                if(err) return that.validationErrMessages(err);
                res.json(empresa);
            }); 
        });
    };
    EmpresasApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.empresa.findByIdAndRemove(req.params.id, function(err, empresa) {
            if(err) return next(err);
            res.json({status: "ok"});
        }); 
    };      
    return EmpresasApi;
})();

module.exports = EmpresasApi;