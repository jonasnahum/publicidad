module.exports = (function() {
    var DireccionController = function(express, direccionApi) {
        this.express = express.module;
        this.direccionApi = direccionApi;
        this.router = this.express.Router();
        
        var router = this.router;

        router.get('/', direccionApi.getAll.bind(direccionApi));
            
        router.post('/', direccionApi.save.bind(direccionApi));

        router.get('/:id', direccionApi.getOne.bind(direccionApi));
        
        router.put('/', direccionApi.update.bind(direccionApi));
        
        router.delete('/:id', direccionApi.delete.bind(direccionApi));
        
    }
    
    return DireccionController;
})();