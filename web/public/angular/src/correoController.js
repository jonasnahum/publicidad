(function() {
    var app = angular.module('app');
    
    app.controller('EmailFormController', [ '$http', '$scope', 'constants', 'errorLog',
                                           function( $http, $scope, constants, errorLog) {  
       
        var model = this;
        model.name = '';
        model.email = '';//el cliente que envía información
        model.phone = '';
        model.message = '';
        model.waiting = false;
        model.success = function(){
            alert('Gracias, su mensage fué enviado con éxito. Prónto nos comunicarémos con usted.');
            model.clear();
        };                       
        model.errorLog = errorLog();//for test propouses
                                               
        
                                               
        model.clear = function() {
            model.name = '';
            model.email = '';
            model.phone = '';
            model.message = '';
            model.waiting = false;
            $scope.mailForm.$setPristine();
        };
                                               
        model.send = function(to) {  //email del encargado de la empresa.          
            model.to = to;
            
            $http({
                method: 'POST',
                url: constants.server + '/correo/',//la varialble constante viene de routes.
                data: model,
                beforeSend: function() {
                    model.waiting = true;
                },
                complete: function() {
                    model.waiting = false;
                }
            }).then(model.success, model.errorLog);
        };
        
    }]);
})();