(function() {
    var app = angular.module("app");
    
    app.factory("constants", [function() {   
        
        return {
            server: 'http://localhost:3000'
        };
        
    }]);
    
})();