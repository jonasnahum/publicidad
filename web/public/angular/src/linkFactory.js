(function() {
    var app = angular.module('app');
    
    app.factory('linkFactory', [function() {//singleton.
        
        var LinkClass = function() {
        };
        
        LinkClass.prototype.removerLink = function(arr, link){
            var sonDiferentes = function sonDiferentes (element, index, array) {
                return index !== link-1;
            }
            arr = arr.filter(sonDiferentes); 
            return arr;
        };
        LinkClass.prototype.agregarLink = function(arr, link){
            if(link){
                arr.push(link);
                link = undefined;
                return link;
            }
        };
        LinkClass.prototype.borrarLinks = function(links){
            links = [];
            return links;
        };
        
        return function() {
            return new LinkClass();
        };
        
    }]);
})();