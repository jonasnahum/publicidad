(function() {
    var app = angular.module('app');
    app.controller('TodosPublicoController', ['$http', '$location', 'paginasProxy', function($http, $location, paginasProxy) {
        var ctrl = this;
        ctrl.paginas = [];
        ctrl.searchText = "";
        //ctrl.requestedPageNumber;
        //ctrl.myPageItemsCount = 4;

        ctrl.getAll = function(){
            paginasProxy.getAll(function(data){
                ctrl.paginas=data;
            });
        };
        ctrl.getAll();  
        
    }]);
})();