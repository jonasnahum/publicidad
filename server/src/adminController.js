module.exports = (function() {
    var AdminController = function(express, adminApi, tokenMiddleware) {
        this.express = express.module;
        this.adminApi = adminApi;
        this.router = this.express.Router();
        
        var router = this.router;
             
        router.post('/signin', adminApi.findByEmail.bind(adminApi));
        
        router.post('/signup', adminApi.save.bind(adminApi));
          
    };
    
    return AdminController;
})();