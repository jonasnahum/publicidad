module.exports = (function() {
    var UsuarioController = function(express, usuarioApi) {
        this.express = express.module;
        this.usuarioApi = usuarioApi;
        this.router = this.express.Router();
        
        var router = this.router;
        var that = this;
        
        router.get('/', usuarioApi.getAll.bind(usuarioApi));
             
        router.post('/', usuarioApi.save.bind(usuarioApi));
        
        router.get('/:id', usuarioApi.getOne.bind(usuarioApi));
        
        router.put('/:id', usuarioApi.update.bind(usuarioApi));
        
        router.delete('/:id', usuarioApi.delete.bind(usuarioApi));
        
        router.get('/pages/:uniquename', usuarioApi.getByUniqueName.bind(usuarioApi));
        
    };
    
    return UsuarioController;
})();