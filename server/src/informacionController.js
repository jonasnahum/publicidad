module.exports = (function() {
    var InformacionController = function(express, informacionApi) {
        this.express = express.module;
        this.informacionApi = informacionApi;
        this.router = this.express.Router();
        
        var router = this.router;

        router.get('/', informacionApi.getAll.bind(informacionApi));
            
        router.post('/', informacionApi.save.bind(informacionApi));

        router.get('/:id', informacionApi.getOne.bind(informacionApi));
        
        router.put('/', informacionApi.update.bind(informacionApi));
        
        router.delete('/:id', informacionApi.delete.bind(informacionApi));
        
    }
    
    return InformacionController;
})();