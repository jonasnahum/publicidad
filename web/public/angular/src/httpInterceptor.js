(function() {
    var app = angular.module("app");
    
    app.factory("httpInterceptor", ['$q', '$location', 'tokenStorage', 'routeChecker', function($q, $location, tokenStorage, routeChecker) {//singleton function.
        
        //"/".indexOf("/paginas/privada/borrar/****") !== 0
        //var re = //;
        
        return {
            
            // optional method
            'request': function(request) {
                var rCh = routeChecker();
                
    
                if (rCh.isPrivate()) {
                    var tokenObj = tokenStorage.getToken();

                    if (tokenObj === undefined){   
                        $location.path('/signin');    
                    }
                }
                           
                //set 'x-access-token' header
                request.headers['x-access-token'] = tokenStorage.getAccessHeader();
                
                return request;
            },

            // optional method
            'requestError': function(rejection) {
                return $q.reject(rejection);//es una promesa, se ejecuta la función reject y se le manda un objeto rejection, esto equivale a ejecutar la función que es el segundo parametro del then  en la promesa.
            },

            // optional method
            'response': function(response) {
                // do something on success
                return response;
            },

            // optional method
            'responseError': function(rejection) {
                if (rejection.status === 401) {
                    $location.path('/signin');
                }
                
                return $q.reject(rejection);
            }
        };
        
    }]);
    
})();