var InformacionApi = (function() {
    var InformacionApi = function(models, informacionFactory) {
        this.models = models;
        this.informacionFactory = informacionFactory;
    };
// curl http://localhost:3000/informacion/api/
    InformacionApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.informacion.find({}, function (err, informacion) {
                if (err) return console.log(err);
                console.log(informacion);
                res.json(informacion);
            });   
    };
//  curl http://localhost:3000/informacion/api/ -d 'noContrato=23324' -d 'url=local.com' -d 'cliente=jonas' -d 'telCliente=23324' -d 'correoCliente=jonasgmail' -d 'pago=23324' -d '_empresaId=564363821b5431d5313c679b'
    InformacionApi.prototype.save = function(req, res, next){
        var that = this;
        var informacion = that.informacionFactory.get();
        informacion.noContrato = req.body.noContrato;
        informacion.url = req.body.url;
        informacion.cliente = req.body.cliente;
        informacion.telCliente = req.body.telCliente;
        informacion.correoCliente = req.body.correoCliente;
        informacion.fechaContrato = req.body.fechaContrato||Date.now();
        informacion.fechaVencimiento = req.body.fechaVencimiento||Date.now();
        informacion.pago = req.body.pago;
        informacion._empresaId = req.body._empresaId;
        informacion.save(function(err, informacion) {
            if(err) return console.log(err);
            console.log("informacion guardada");
            console.log(informacion);
            res.json(informacion);
        }); 
    };
//curl http://localhost:3000/informacion/api/5643934b3274898f370d1e31
    InformacionApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.informacion.findOne({ _id: req.params.id })
        .exec(function (err, informacion) {
            if (err) return next(err);
            console.log(informacion);
            res.json(informacion);
        });
    };
//curl -X PUT -d id=5642384e38c02a60112346f6 -d 'noContrato=23324' -d 'url=23324' -d 'cliente=23324' -d 'telCliente=23324' -d 'correoCliente=23324' -d 'fechaContrato=23324' -d 'fechaVencimiento=23324' -d 'pago=23324'  http://localhost:3000/informacion/api/
    InformacionApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.informacion.findById(req.body.id, function (err, informacion) {
            if(err) return next(err);
            informacion.noContrato = req.body.noContrato;
            informacion.url = req.body.url;
            informacion.cliente = req.body.cliente;
            informacion.telCliente = req.body.telCliente;
            informacion.correoCliente = req.body.correoCliente;
            informacion.fechaContrato = req.body.fechaContrato;
            informacion.fechaVencimiento = req.body.fechaVencimiento;
            informacion.pago = req.body.pago;
            informacion._empresaId = req.body._empresaId;
            informacion.save(function(err, informacion) {
                if(err) return console.log(err);
                console.log("informacion cambiada");
                console.log(informacion);
                res.json(informacion);
            }); 
        });
    };
//curl -X "DELETE" http://localhost:3000/informacion/api/56424b02f58afa5e147b6063
    InformacionApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.informacion.findByIdAndRemove(req.params.id, function(err, informacion) {
            if(err) return next(err);
            res.json(informacion);
        }); 
    };      
    
    return InformacionApi;
})();

module.exports = InformacionApi;