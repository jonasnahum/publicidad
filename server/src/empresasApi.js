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
            if(err) return console.log(err);
            console.log("empresa guardada");
            console.log(empresa);  
        }); 
        res.json(empresa);
    };
//curl http://localhost:3000/empresas/api/56461263510dc1af0f9a32bf
    EmpresasApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.empresa.findOne({ _id: req.params.id })
        .exec(function(err, empresa){
            if (err) return next(err);
            console.log("empresa encontrada")
            console.log(empresa);
            return res.json(empresa);
        });
    };

//curl -X PUT -i -H "Content-Type: application/json" -d '{"nombre":"UPDATED","logotipo":"rojoyblanco","foto":"unamuchacha","textoIntro":"bienvenidos","lat":"01","long":"02","descripcion":"refresqueramasgrandedelmundo","horario":"todoslosdias","encargado":"ellic","tel":"33333","face":"elface","email":"cocacola@gmail.com","productos": [{"lata":"de 500ml"},{"botella":"de 600ml"}] ,"nota":"servicio a domicilio","numero":"UPDATED","numeroInt":"1A","calle":"zumpimito","colonia":"zumpimito","cp":"607400","municipio":"uruapan","estado":"michoacan","rubro":"UPDATED","noContrato":"UPDATED","url":"cocacola.com","cliente":"patty","telCliente":"23324","correoCliente":"patty@gmail","pago":"23324"}' http://localhost:3000/empresas/api/ 5646467e83540be61605d680
    
    EmpresasApi.prototype.update = function(req, res, next) {
        var that = this;
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
                if(err) return next(err);
                console.log ("empresa cambiada");
                console.log(empresa);
                res.json(empresa);
            }); 
        });
    };
//curl -X "DELETE" http://localhost:3000/empresas/api/5646400628346fef1513c651
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