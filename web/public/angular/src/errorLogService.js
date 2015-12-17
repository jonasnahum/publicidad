(function() {
    var app = angular.module("app");
    
    app.factory("errorLog", ['$log', '$location', function($log, $location) { 
        
        return function(data, status, headers, config, statusText) {
            if (config) {
                $log.error('%s %s %s', config.method, config.url, status);
            }
            else {
                $log.error('error');
            }
            
            $location.path('/error');
        }
        
    }]);
    
})();