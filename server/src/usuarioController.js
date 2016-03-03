module.exports = (function() {
    var UsuariosController = function(express, usuariosApi, tokenMiddleware) {
        this.express = express.module;
        this.usuariosApi = usuariosApi;
        this.router = this.express.Router();
        
        var router = this.router;
             
        router.post('/', usuariosApi.save.bind(usuariosApi));
        
        router.get('/', tokenMiddleware.validate.bind(tokenMiddleware), usuariosApi.getAll.bind(usuariosApi));
        
        router.get('/:id', tokenMiddleware.validate.bind(tokenMiddleware), usuariosApi.getOne.bind(usuariosApi));
        
        router.put('/:id', tokenMiddleware.validate.bind(tokenMiddleware), usuariosApi.update.bind(usuariosApi));
        
        router.delete('/:id'/ tokenMiddleware.validate.bind(tokenMiddleware), usuariosApi.delete.bind(usuariosApi));
        
        router.delete('/peligro/deleteAll', usuariosApi.deleteAll.bind(usuariosApi));
    };
    
    return UsuariosController;
})();
