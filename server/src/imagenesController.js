module.exports = (function() {
    var ImagenesController = function(express, imagenesApi) {
        this.express = express.module;
        this.imagenesApi = imagenesApi;
        this.router = this.express.Router();
        
        var router = this.router;

        router.get('/getAll', imagenesApi.getAll.bind(imagenesApi));
            
        router.post('/post', imagenesApi.save.bind(imagenesApi));

        router.get('/oneImagen/:id',  imagenesApi.getOne.bind(imagenesApi));
        
    }
    
    return ImagenesController;
})();