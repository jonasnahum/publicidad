module.exports = (function() {
    var RubrosController = function(express, rubrosApi) {
        this.express = express.module;
        this.rubrosApi = rubrosApi;
        this.router = this.express.Router();
        
        var router = this.router;

        router.get('/', rubrosApi.getAll.bind(rubrosApi));
            
        router.post('/', rubrosApi.save.bind(rubrosApi));

        router.get('/:id', rubrosApi.getOne.bind(rubrosApi));
        
        router.put('/', rubrosApi.update.bind(rubrosApi));
        
        router.delete('/:id', rubrosApi.delete.bind(rubrosApi));
        
    }
    
    return RubrosController;
})();