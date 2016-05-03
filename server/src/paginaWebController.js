module.exports = (function() {
    var EmpresasController = function(express, paginaWebApi, tokenMiddleware) {
        this.express = express.module;
        this.paginaWebApi = paginaWebApi;
        this.router = this.express.Router();
        
        var router = this.router;
        //curl http://api.weburuapan.com/paginaweb/api
        router.get('/', paginaWebApi.getAll.bind(paginaWebApi));
            
        router.get('/:id', paginaWebApi.getOne.bind(paginaWebApi));
        
        router.get('/pages/:uniquename/', paginaWebApi.getByUniqueName.bind(paginaWebApi));
        
        router.post('/:userId', paginaWebApi.save.bind(paginaWebApi));
        
        router.put('/:id', paginaWebApi.update.bind(paginaWebApi));
        
        router.delete('/:id', paginaWebApi.delete.bind(paginaWebApi));
        //curl -X "DELETE" http://api.weburuapan.com/paginaWeb/api/soloEmpresa/5727d6998521e52000b7b487
        router.delete('/soloEmpresa/:id', paginaWebApi.deleteSoloEmpresa.bind(paginaWebApi));
    }
    
    return EmpresasController;

})();
