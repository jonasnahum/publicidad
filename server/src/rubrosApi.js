var RubrosApi = (function() {
    var RubrosApi = function(models, rubroFactory) {
        this.models = models;
        this.rubroFactory = rubroFactory;
    };
// curl http://localhost:3000/rubros/api/
    RubrosApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.rubro.find({}, function (err, rubros) {
                if (err) return console.log(err);
                console.log(rubros);
                res.json(rubros);
            });   
    };
//  curl http://localhost:3000/rubros/api/ -d 'nombre=purificadoras' -d '_empresaId=56425fbec576c69617a857bf'
    RubrosApi.prototype.save = function(req, res, next){
        var that = this;
        var rubro = that.rubroFactory.get();
        rubro.nombre = req.body.nombre;
        rubro._empresaId = req.body._empresaId;
        rubro.save(function(err, rubro) {
            if(err) return console.log(err);
            console.log("rubro guardado");
            console.log(rubro);
            res.json(rubro);
        }); 
    };
//curl http://localhost:3000/rubros/api/56424b02f58afa5e147b6063
    RubrosApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.rubro.findOne({ _id: req.params.id })
        .exec(function (err, rubro) {
            if (err) return next(err);
            console.log(rubro);
            res.json(rubro);
        });
    };
//curl -X PUT -d id=5642384e38c02a60112346f6 -d nombre=tortilladora -d http://localhost:3000/rubros/api/
    RubrosApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.rubro.findById(req.body.id, function (err, rubro) {
            if(err) return next(err);
            rubro.nombre = req.body.nombre;

            rubro.save(function(err, rubro) {
                if(err)return next(err);
                console.log ("rubro cambiado");
                console.log(rubro);
                res.json(rubro);
            }); 
        });
    };
//curl -X "DELETE" http://localhost:3000/rubros/api/56424b02f58afa5e147b6063
    RubrosApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.rubro.findByIdAndRemove(req.params.id, function(err, rubro) {
            if(err) return next(err);
            res.json(rubro);
        }); 
    };      
    
    return RubrosApi;
})();

module.exports = RubrosApi;