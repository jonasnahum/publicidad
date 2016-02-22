module.exports = (function() {
    var EmpresasController = function(express, paginaWebApi, tokenMiddleware) {
        this.express = express.module;
        this.paginaWebApi = paginaWebApi;
        this.router = this.express.Router();
        
        var router = this.router;

        router.get('/', paginaWebApi.getAll.bind(paginaWebApi));
            
        router.get('/:id', paginaWebApi.getOne.bind(paginaWebApi));
        
        router.post('/:usuarioid', paginaWebApi.save.bind(paginaWebApi));
        
        //router.put('/:id', tokenMiddleware.validate.bind(tokenMiddleware), paginaWebApi.update.bind(paginaWebApi));
        //sin token.
        router.put('/:id', paginaWebApi.update.bind(paginaWebApi));
        
        //router.delete('/:id', tokenMiddleware.validate.bind(tokenMiddleware), paginaWebApi.delete.bind(paginaWebApi));
        //sin token
        router.delete('/:id', paginaWebApi.delete.bind(paginaWebApi));
        
    }
    
    return EmpresasController;

})();


