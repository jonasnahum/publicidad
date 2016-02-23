module.exports = (function() {
    var UsuariosController = function(express, usuariosApi) {
        this.express = express.module;
        this.usuariosApi = usuariosApi;
        this.router = this.express.Router();
        
        var router = this.router;
        var that = this;
             
        router.post('/', usuariosApi.save.bind(usuariosApi));
        
        router.get('/', usuariosApi.getAll.bind(usuariosApi));
        
        router.get('/:id', usuariosApi.getOne.bind(usuariosApi));
        
        router.put('/:id', usuariosApi.update.bind(usuariosApi));
        
        router.delete('/:id', usuariosApi.delete.bind(usuariosApi));
        
        router.get('/pages/:uniquename', usuariosApi.getByUniqueName.bind(usuariosApi));
        
    };
    
    return UsuariosController;
})();
