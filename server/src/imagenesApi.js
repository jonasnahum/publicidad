/*var ImagenesApi = (function() {
    var ImagenesApi = function(models, imagenFactory, fs) {
        this.models = models;
        this.imagenFactory = imagenFactory;
        this.fs = fs.module;
        
    };
    //curl http://localhost:3000/imagenes/api/getAll
    ImagenesApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.imagen.find(function (err, imagenes) {
            if (err) return next(err);
            console.log(imagenes)
            res.json(imagenes);
        });
    };
    //curl http://localhost:3000/imagenes/api/oneImagen/563a52088ffd0f7317631896
    ImagenesApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.imagen.findOne({ _id: req.params.id })
        .exec(function (err, imagen) {
            if (err) return next(err);
            console.log(imagen);
            var buffer = imagen.imagen.data;
            var base64 = (buffer.toString('base64'));
            res.json(base64);        
        });
    };
    //curl -i -H "Content-Type: application/json" -d '{ "username": "rodrigo", "password": "test", "id": 1 }' http://localhost:3000/imagenes/api/post
    ImagenesApi.prototype.save = function(req, res, next){
        var that = this;
        var imagen = that.imagenFactory.get();
        console.log("entró al post en el servidor");
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            var bufs = [];
            
            file.on('data', function(data) {//data is type stream, ver si se puede agregar directo a imagen.imagen.data.
                bufs.push(data);
                //imagen.imagen.data = data;
            });
            
            file.on('end', function() {
                imagen.imagen.data = Buffer.concat(bufs);
                imagen.imagen.contentType = 'image/png';
                console.log('File' + filename + 'is ended');
                imagen.save(function(err, imagen) {
                    if(err){
                        Object.keys(err.errors).forEach(function(key) {
                            var message = err.errors[key].message;
                            console.log('Validation error for "%s": %s', key, message);
                        });
                    }
                    console.log("no hubo error al guardar imagen");
                }); 
            });
        });
        req.busboy.on('finish', function(){
            console.log('Busboy is finished');
            res.send({data: "fue un exito la respuesta del servidor"});
        })
        req.pipe(req.busboy);
    };
    //curl -X "DELETE" http://localhost:3000/imagenes/api/borrar/563b7f43b25fd8a70f740b74
    ImagenesApi.prototype.delete = function(req, res, next) {
        var that = this;
        
        that.models.imagen.remove({ _id: req.params.id }, function(err, imagen) {
            if(err) return next(err);
            res.json(imagen);
        }); 
    };    
    
    return ImagenesApi;
})();

module.exports = ImagenesApi;

*/


var ImagenesApi = (function() {
    var ImagenesApi = function(models, imagenFactory, fs) {
        this.models = models;
        this.imagenFactory = imagenFactory;
        this.fs = fs.module;
    };
    //curl http://localhost:3000/imagenes/api/getAll
    ImagenesApi.prototype.getAll = function(req, res, next) {
        var that = this;       
        
        that.models.imagen.find(function (err, imagenes) {
            if (err) return next(err);
            console.log(imagenes)
            res.json(imagenes);
        });
    };
    //curl http://localhost:3000/imagenes/api/oneImagen/563a52088ffd0f7317631896
    ImagenesApi.prototype.getOne = function(req, res, next) {
        var that = this;
        
        that.models.imagen.findOne({ _id: req.params.id })
        .exec(function (err, imagen) {
            if (err) return next(err);
            console.log(imagen);
            var buffer = imagen.imagen.data;
            var base64 = (buffer.toString('base64'));
            res.json(base64);        
        });
    };
    //curl -i -H "Content-Type: application/json" -d '{ "username": "rodrigo", "password": "test", "id": 1 }' http://localhost:3000/imagenes/api/post
    ImagenesApi.prototype.save = function(req, res, next){
        var that = this;
        var bufs = [];
        var serialized = [];
            
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

            file.on('data', function(data) {//data is type stream, ver si se puede agregar directo a imagen.imagen.data.
                bufs.push(data);
            });
            
            file.on('end', function() {
                var arr = Buffer.concat(bufs);
                serialized = arr.toString("base64");
                //res.json(serialized);
            });
        });
        req.busboy.on('finish', function(){
           console.log("se ejecutó el evento finish");
            res.json(serialized);
        })
        req.pipe(req.busboy);
    };
    //curl -X "DELETE" http://localhost:3000/imagenes/api/borrar/563b7f43b25fd8a70f740b74
    ImagenesApi.prototype.delete = function(req, res, next) {
        var that = this;
        
        that.models.imagen.remove({ _id: req.params.id }, function(err, imagen) {
            if(err) return next(err);
            res.json(imagen);
        }); 
    };    
    
    return ImagenesApi;
})();

module.exports = ImagenesApi; 