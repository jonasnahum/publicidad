module.exports = (function() {
    var EmpresasController = function(express, empresasApi) {
        this.express = express.module;
        this.empresasApi = empresasApi;
        this.router = this.express.Router();
        
        var router = this.router;

        router.get('/', empresasApi.getAll.bind(empresasApi));
            
        router.post('/', empresasApi.save.bind(empresasApi));

        router.get('/:id', empresasApi.getOne.bind(empresasApi));
        
        router.put('/:id', empresasApi.update.bind(empresasApi));
        
        router.delete('/:id', empresasApi.delete.bind(empresasApi));
        
        router.delete('/', empresasApi.deleteDocs.bind(empresasApi));
        
    }
    
    return EmpresasController;

})();

