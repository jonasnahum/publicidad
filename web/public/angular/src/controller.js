(function() {
    var app = angular.module('app');
    
    app.controller('PruebaController', ['Upload', '$timeout', '$http', '$location', function(Upload, $timeout, $http, $location) {
        var ctrl = this;
        ctrl.nombre = undefined;
        ctrl.logotipo = undefined;
        ctrl.foto = undefined;
        ctrl.textoIntroductorio = undefined;
        ctrl.fechaContrato = undefined;
        ctrl.fechaVencimiento = undefined;
        
        ctrl.save = function() {
            console.dir(ctrl);
            $http({
                url: 'http://localhost:3001/empresa',
                method: "POST",
                data: ctrl
            }).success(function(data, status, headers, config){
                alert("Info enviada");
                $location.path('/');
            }).error(function(data, status, headers, config) {
                alert("UPS there's an error");
                console.log("%s %s %s", data, status, config);
                
            });
        };
   
        ctrl.uploadFiles = function (files, errFiles, propertyName) {
            ctrl.files = files;
            ctrl.errFile = errFiles && errFiles[0];
            if (files && files.length) {
                Upload.upload({
                    url: 'http://localhost:3000/imagenes/api/post',
                    data: {
                        files: files
                    }
                }).then(function (response) {
                    ctrl[propertyName] = response.data;
                    //alert("Arrived a serialized string");
                }, function (response) {
                    if (response.status > 0) {
                        ctrl.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    ctrl.progress = 
                        Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        };       
        
        
        
        
    }]);
    
})();
