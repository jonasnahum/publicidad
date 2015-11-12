var EmpresasApi = (function() {
    var EmpresasApi = function(models, empresaFactory, direccionFactory, rubroFactory, informacionFactory) {
        this.models = models;
        this.empresaFactory = empresaFactory;
        this.direccionFactory = direccionFactory;
        this.rubroFactory = rubroFactory;
        this.informacionFactory = informacionFactory;
    };
// curl http://localhost:3000/empresas/api/
    EmpresasApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.empresa.find({}, function (err, empresas) {
                if (err) return console.log(err);
                console.log(empresas);
                res.json(empresas);
            });   
    };    
    
//curl -i -H "Content-Type: application/json" -d '{"nombre":"CHECARRUBRO","logotipo":"rojoyblanco","foto":"unamuchacha","textoIntro":"bienvenidos","lat":"01","long":"02","descripcion":"refresqueramasgrandedelmundo","horario":"todoslosdias","encargado":"ellic","tel":"33333","face":"elface","email":"cocacola@gmail.com","productos": [{"lata":"de 500ml"},{"botella":"de 600ml"}] ,"nota":"servicio a domicilio","numero":"2","numeroInt":"1A","calle":"zumpimito","colonia":"zumpimito","cp":"607400","municipio":"uruapan","estado":"michoacan","rubro":"Rubroexitoso","noContrato":"23324","url":"cocacola.com","cliente":"patty","telCliente":"23324","correoCliente":"patty@gmail","pago":"23324"}' http://localhost:3000/empresas/api/ 

    EmpresasApi.prototype.save = function(req, res, next){
        var that = this;
        var empresa = that.empresaFactory.get();
        empresa.nombre = req.body.nombre;
        empresa.logotipo = req.body.logotipo;
        empresa.foto = req.body.foto;
        empresa.textoIntro = req.body.textoIntro;
        empresa.lat = req.body.lat;
        empresa.long = req.body.long;
        empresa.descripcion = req.body.descripcion;
        empresa.horario = req.body.horario;
        empresa.encargado = req.body.encargado;
        empresa.tel = req.body.tel;
        empresa.face = req.body.face;
        empresa.email = req.body.email;
        empresa.productos = req.body.productos;
        empresa.nota = req.body.nota;
        empresa.save(function(err, empresa) {
            if(err) return console.log(err);
            console.log("empresa guardada");
            console.log(empresa);
            var direccion = that.direccionFactory.get();
            direccion.numero = req.body.numero;
            direccion.numeroInt = req.body.numeroInt;
            direccion.calle = req.body.calle;
            direccion.colonia = req.body.colonia;
            direccion.cp = req.body.cp;
            direccion.municipio = req.body.municipio;
            direccion.estado = req.body.estado;
            direccion._empresaId = empresa._id;
            direccion.save(function(err, direccion){
                if(err) return console.log(err);
                console.log("dirección guardada");
                console.log(direccion);
            });
            var rubro = that.rubroFactory.get();
            rubro.rubro = req.body.rubro;
            rubro._empresaId = empresa._id;
            rubro.save(function(err, rubro){
                if(err) return console.log(err);
                console.log("rubro guardado");
                console.log(rubro);
            });
            var informacion = that.informacionFactory.get();
            informacion.noContrato = req.body.noContrato;
            informacion.url = req.body.url;
            informacion.cliente = req.body.cliente;
            informacion.telCliente = req.body.telCliente;
            informacion.correoCliente = req.body.correoCliente;
            informacion.fechaContrato = req.body.fechaContrato||Date.now();
            informacion.fechaVencimiento = req.body.fechaVencimiento||Date.now();
            informacion.pago = req.body.pago;
            informacion._empresaId = empresa._id;
            informacion.save(function(err, informacion) {
                if(err) return console.log(err);
                console.log("informacion guardada");
                console.log(informacion);
            }); 
        }); 
        res.json(empresa);
    };
// curl http://localhost:3000/empresas/api/5644ddce1aa8169044c95568
    EmpresasApi.prototype.getOne = function(req, res, next) {
        var that = this;
        var empresa = {};
        var promise1 = function(){
            return that.models.empresa.findOne({ _id: req.params.id })
            .exec(function(err, empresaMongoose){
                if (err) return next(err);
                empresa = empresaMongoose;
                console.log("paso1");
            });
        };
        var promise2 = function() {
            return that.models.direccion.findOne({_empresaId: empresa._id})
            .exec(function(err, direccion){
                if (err) return next(err);
                empresa.direccion = direccion;
                console.log("paso2");
            });
        };
        var promise3 = function() {
            return that.models.rubro.findOne({_empresaId: empresa._id})
            .exec(function(err, rubro){
                if (err) return next(err);
                empresa.rubro = rubro;
                console.log("paso3");
            });
        };
        var promise4 = function() {
            return that.models.informacion.findOne({_empresaId: empresa._id})
            .exec(function(err, informacion){
                if (err) return next(err);
                empresa.informacion = informacion;
                console.log("paso4");
            });
        };
        var promise5 = function(){
            console.log("paso5");
            console.log(empresa);
            console.log(empresa.direccion);
            console.log(empresa.rubro);
            console.log(empresa.informacion);
            return res.json(empresa);
        };
        promise1().then(promise2).then(promise3).then(promise4).then(promise5);
    };
//curl -X PUT -d id=56420ae051fed7100d8465d0 -d nombre=jonas2 http://localhost:3000/empresas/api/
    EmpresasApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.empresa.findById(req.body.id, function (err, empresa) {
            if(err) return next(err);
            empresa.nombre = req.body.nombre;

            empresa.save(function(err, empresa) {
                if(err){
                    Object.keys(err.errors).forEach(function(key) {
                        var message = err.errors[key].message;
                        console.log('Validation error for "%s": %s', key, message);
                    });
                }
                console.log ("empresa cambiada");
                console.log(empresa);
                res.json(empresa);
            }); 
        });
    };
//curl -X "DELETE" http://localhost:3000/empresas/api/56420ae051fed7100d8465d0
    EmpresasApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.empresa.findByIdAndRemove(req.params.id, function(err, empresa) {
            if(err) return next(err);
            res.json(empresa);
        }); 
    };      
    
    return EmpresasApi;
})();

module.exports = EmpresasApi;