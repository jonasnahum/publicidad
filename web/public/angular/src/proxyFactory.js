(function() {
    var app = angular.module('app');
    
    app.factory('proxyFactory', ['$http', '$log', function($http, $log) {
        var Proxy = function(url) {
            this.url = "http://localhost:3000" + url;
        };
        
        Proxy.prototype.error = function(data, status, headers, config){
            $log.error('%s %s %s', config.method, config.url, status);
        };
        
        /*
        Proxy.prototype.save = function(model, success) {
            var that = this;
            $http({
                method: 'POST',
                url: that.url,
                data: model
            }).success(success).error(that.error);
        };
        */
        return function(url) {
            return new Proxy(url);
        };
    }]);
})();