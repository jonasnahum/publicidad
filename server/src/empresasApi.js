var EmpresasApi = (function() {
    var EmpresasApi = function(models, empresaFactory) {
        this.models = models;
        this.empresaFactory = empresaFactory;
    };

    EmpresasApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        that.models.empresa.find({}, function (err, empresas) {
                if (err) return console.log(err);
                res.json(empresas);
            });   
    };    
//curl -i -H "Content-Type: application/json" -d '{"nombre":"fjalsdfjalskdfj","textoIntro":"asdfasdfasdf","descripcion":"asdfasdf","horario":"todos los días","encargado":"Jonás Nahúm Jiménez García","tel":"45898999","face":"jonasnahum","email":"jonasnahum@gmail.com","productos":[{"titulo":"asdfa","parrafo":"asfdasdf"}],"nota":"asdfasdf","numero":"1 c","numeroInt":"b","calle":"jonas","colonia":"jorhentipiri","cp":"6asdf0060","municipio":"uruapan","estado":"michoacan","rubro":"purificadoras","noContrato":"1","url":"fasdf","cliente":"asdfasfdaasdf","telCliente":"45","correoCliente":"jonasnahum@gmail.com","fechaContrato":"2015-12-23T06:00:00.000Z","fechaVencimiento":"2015-12-23T06:00:00.000Z","pago":"1220","lat":19.4096,"long":-102.052}' http://localhost:3000/empresas/api/
    
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
        empresa.direccion={
            numero: req.body.numero,
            numeroInt: req.body.numeroInt,
            calle: req.body.calle,
            colonia: req.body.colonia,
            cp: req.body.cp,
            municipio: req.body.municipio,
            estado: req.body.estado
        };
        empresa.rubro={
            rubro: req.body.rubro
        };
        empresa.informacion={
            noContrato: req.body.noContrato,
            url: req.body.url,
            cliente: req.body.cliente,
            telCliente: req.body.telCliente,
            correoCliente: req.body.correoCliente,
            fechaContrato: req.body.fechaContrato||Date.now(),
            fechaVencimiento: req.body.fechaVencimiento||Date.now(),
            pago: req.body.pago
        };
        empresa.save(function(err, empresa) {
            if(err){
                Object.keys(err.errors).forEach(function(key) {
                    var message = err.errors[key].message;
                    console.log('Validation error for "%s": %s', key, message);
                });
            }  
        }); 
        res.json(empresa);
    };

    EmpresasApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.empresa.findOne({ _id: req.params.id })
        .exec(function(err, empresa){
            if (err) return next(err);
            return res.json(empresa);
        });
    };

    EmpresasApi.prototype.update = function(req, res, next) {
        var that = this;
        console.log("llego 1");
        console.log(req.params.id);
        that.models.empresa.findById(req.params.id, function (err, empresa) {
            if(err) return next(err);
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
            empresa.direccion={
                numero: req.body.numero,
                numeroInt: req.body.numeroInt,
                calle: req.body.calle,
                colonia: req.body.colonia,
                cp: req.body.cp,
                municipio: req.body.municipio,
                estado: req.body.estado
            };
            empresa.rubro={
                rubro: req.body.rubro
            };
            empresa.informacion={
                noContrato: req.body.noContrato,
                url: req.body.url,
                cliente: req.body.cliente,
                telCliente: req.body.telCliente,
                correoCliente: req.body.correoCliente,
                fechaContrato: req.body.fechaContrato||Date.now(),
                fechaVencimiento: req.body.fechaVencimiento||Date.now(),
                pago: req.body.pago
            };
            empresa.save(function(err, empresa) {
                if(err){
                    Object.keys(err.errors).forEach(function(key) {
                        var message = err.errors[key].message;
                        console.log('Validation error for "%s": %s', key, message);
                    });
                }
                res.json(empresa);
            }); 
        });
    };
//curl -X "DELETE" http://localhost:3000/empresas/api/5646467e83540be61605d680
    EmpresasApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.empresa.findByIdAndRemove(req.params.id, function(err, empresa) {
            if(err) return next(err);
            res.json({status: "ok"});
        }); 
    };      
    
//DELETE ALL DOCUMENTS OF A COLLECTION    
//curl -X "DELETE" http://localhost:3000/empresas/api/
    EmpresasApi.prototype.deleteDocs = function(req, res, next) {
        var that = this;
        that.models.empresa.remove({}, function(err, empresa) {
            if(err) return next(err);
            console.log("Documents deleted");
            res.json({status: "ok"});
        }); 
    };
    return EmpresasApi;
})();

module.exports = EmpresasApi;