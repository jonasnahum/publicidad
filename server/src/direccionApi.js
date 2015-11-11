var DireccionApi = (function() {
    var DireccionApi = function(models, direccionFactory) {
        this.models = models;
        this.direccionFactory = direccionFactory;
    };
// curl http://localhost:3000/direcciones/api/
    DireccionApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.direccion.find({}, function (err, direcciones) {
                if (err) return console.log(err);
                console.log(direcciones);
                res.json(direcciones);
            });   
    };
//  curl http://localhost:3000/direcciones/api/ -d 'calle=rodrigo' -d '_empresaId=56420b1914186e360d10c9a1'
    DireccionApi.prototype.save = function(req, res, next){
        var that = this;
        var direccion = that.direccionFactory.get();
        direccion.calle = req.body.calle;
        direccion._empresaId = req.body._empresaId;
        direccion.save(function(err, direccion) {
            if(err) return console.log(err);
            console.log("direccion guardada");
            console.log(direccion);
            res.json(direccion);
        }); 
    };
//curl http://localhost:3000/direcciones/api/56424b02f58afa5e147b6063
    DireccionApi.prototype.getOne = function(req, res, next) {
        var that = this;
        that.models.direccion.findOne({ _id: req.params.id })
        .exec(function (err, direccion) {
            if (err) return next(err);
            console.log(direccion);
            res.json(direccion);
        });
    };
//curl -X PUT -d id=5642384e38c02a60112346f6 -d calle=aquenopuedescomersolouna -d http://localhost:3000/direcciones/api/
    DireccionApi.prototype.update = function(req, res, next) {
        var that = this;
        that.models.direccion.findById(req.body.id, function (err, direccion) {
            if(err) return next(err);
            direccion.calle = req.body.calle;

            direccion.save(function(err, direccion) {
                if(err)return next(err);
                console.log ("dirección cambiada");
                console.log(direccion);
                res.json(direccion);
            }); 
        });
    };
//curl -X "DELETE" http://localhost:3000/direcciones/api/56424b02f58afa5e147b6063
    DireccionApi.prototype.delete = function(req, res, next) {
        var that = this;
        that.models.direccion.findByIdAndRemove(req.params.id, function(err, direccion) {
            if(err) return next(err);
            res.json(direccion);
        }); 
    };      
    
    return DireccionApi;
})();

module.exports = DireccionApi;