(function() {
    var app = angular.module("app");
    
    app.factory("constants", [function() {   
        
        return {
            server: $('#hidServer').val()
        };
        
    }]);
    
})();