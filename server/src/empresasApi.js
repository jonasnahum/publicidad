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
    };
    
    EmpresasApi.prototype.getAll = function(req, res, next) {        
        var that = this;              
        that.models.empresa.find({}, function (err, empresas) {
            if (err) return console.log(err);
            
            console.log("GET ALL Empresas");
            console.dir(empresas);
            res.json(empresas);
        })
            //.populate('_usuario', 'cliente fechaRegistro -_id')//-id no renderea el id del usuario
            .populate('_usuario', 'cliente fechaRegistro')
            .select('nombre _id _usuario')
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
    EmpresasApi
    
    EmpresasApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.empresa.findOne({ _id: req.params.id })
        .populate('_usuario')
        .exec(function(err, empresa){
            if (err) return next(err);
            
            console.log("GETONE empresa");
            console.dir(empresa);
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
        /*var that = this;
        that.models.empresa.findById(req.params.id, function (err, empresa) {
            if(err) return next(err);
            empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
            empresa.save(function(err, empresa) {
                if(err) return that.validationErrMessages(err);
                res.json(empresa);
            }); 
        });*/
        
        /*var that = this;
        that.models.empresa.findById(req.params.id, function (err, empresa) {
            if(err) return next(err);
            empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
            //empresa.save()
        })
        .populate('_usuario', '-paginaWeb');
        */
        var that = this;
        that.models.usuario.findById(req.body.userId, function (err, found) {
            if(err) return console.log(err);
            
            that.models.empresa.findById(req.params.id, function (err, empresa) {
                if(err) return next(err);
                
                empresa = that.copy.copyBodyToEmpresa(req.body, empresa);
                console.dir(empresa);
                empresa.save(function(err, empresa) {
                    if(err) return that.validationErrMessages(err);
                    
                    console.log(empresa);
                    console.log("Se modifico empresa");
                });
                //guardar propiedad por propiedad
                found.noContrato = req.body.noContrato,
                found.uniquename = req.body.uniquename,
                found.cliente = req.body.cliente,
                found.telCliente = req.body.telCliente,
                found.correoCliente = req.body.correoCliente,
                found.fechaRegistro = req.body.fechaContrato,
                found.fechaVencimiento = req.body.fechaVencimiento,
                found.pago = req.body.pago
                found.save(function(err, user) {
                    if(err) return console.log("Usuario save ERROR" + err);
                    console.log("Usuario modificado " + user);
                });
            })
            .populate('_usuario', '-paginaWeb');
            
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