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
    
    
    EmpresasApi.prototype.getAll = function(req, res, next) {//Aun hay que modificarlo
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
    
    
    
    EmpresasApi.prototype.save = function(req, res, next){
        var that = this;
        var empresa = that.empresaFactory.get();
        empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
        empresa.save(function(err, empresa) {
            if(err) return that.validationErrMessages(err);
        }); 
        res.json(empresa);
    };

    
    EmpresasApi.prototype.savePublico = function(req, res, next){
        var id = req.params.id;
        var that = this;
        
        that.models.usuario.findById(req.params.id, function (err, found) {
            if(err) return console.log('OH DEAR... ' + err);//return next(err);
            
            var empresa = that.empresaFactory.get();
            empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
            empresa.save(function(err, empresa) {
                if(err) {
                    console.log(err);
                    return that.validationErrMessages(err);
                }
                
                console.log(empresa);
                console.log('Empresa guardada y en _usuario va el _id de usuario');
            });
            
            found.paginaWeb.push(empresa);
            found.save(function(err, user) {
                if(err) return console.log("Usuario save ERROR" + err);
                console.log("Empresa guardada en usuario" + user);
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