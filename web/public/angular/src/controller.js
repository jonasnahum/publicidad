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
                url: '/miEmpresa',
                method: "POST",
                data: ctrl
            }).success(function(data, status, headers, config){
                alert("Info enviada");
                $location.path('/');
            }).error(function(data, status, headers, config) {
                alert("UPS there's an error");
                console.log(status);
                
            });
        };
        
        ctrl.archivo = undefined;
        ctrl.errArchivo = undefined;
        ctrl.errorMensaje = undefined;
        ctrl.serialStrg = undefined;
       
         ctrl.logo = function(file, errFiles) {
            ctrl.archivo = file;
            ctrl.errArchivo = errFiles && errFiles[0];
            if (ctrl.archivo) {
                ctrl.archivo.upload = Upload.upload({
                    url: 'http://localhost:3000/imagenes/api/logo',
                    data: {file: file}
                });

                ctrl.archivo.upload.then(function (response) {
                    ctrl.serialStrg = response.data;
                    ctrl.logotipo = ctrl.serialStrg;
                }, function (response) {
                    if (response.status > 0)
                        ctrl.errorMensaje = response.status + ': ' + response.data;
                }, function (evt) {
                    ctrl.archivo.progress = Math.min(100, parseInt(100.0 * 
                                             evt.loaded / evt.total));
                });
            }   
        }
         
        ctrl.f = undefined;
        ctrl.errFile = undefined;
        ctrl.errorMsg = undefined;
        ctrl.serial = undefined;
        ctrl.uploadFiles = function(file, errFiles) {
            ctrl.f = file;
            ctrl.errFile = errFiles && errFiles[0];
            if (ctrl.f) {
                ctrl.f.upload = Upload.upload({
                    url: 'http://localhost:3000/imagenes/api/foto',
                    data: {file: file}
                });

                ctrl.f.upload.then(function (response) {
                    ctrl.serial = response.data;
                    ctrl.foto = response.serial;
                }, function (response) {
                    if (response.status > 0)
                        ctrl.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    ctrl.f.progress = Math.min(100, parseInt(100.0 * 
                                             evt.loaded / evt.total));
                });
            }   
        }
        
        
    }]);
    
})();
/*(function() {
    var app = angular.module('app');
    
    app.controller('PruebaController', ['$http', '$location', 'Upload', '$timeout', function($http, $location, Upload, $timeout) {
        var ctrl = this;
        ctrl.nombre = undefined;
        ctrl.logotipo = undefined;
        ctrl.foto = undefined;
        ctrl.textoIntroductorio = undefined;
        
        ctrl.f = undefined;
        ctrl.errFile = undefined;
        ctrl.errorMsg = undefined;
        ctrl.serial = undefined;
        
        
        ctrl.uploadFiles = function(file, errFiles) {
            ctrl.f = file;
            ctrl.errFile = errFiles && errFiles[0];
            if (ctrl.f) {
                ctrl.f.upload = Upload.upload({
                    url: 'http://localhost:3000/imagenes/api/post',
                    data: {file: file}
                });

                ctrl.f.upload.then(function (response) {
                    ctrl.serial = response.data;
                }, function (response) {
                    if (response.status > 0)
                        ctrl.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    ctrl.f.progress = Math.min(100, parseInt(100.0 * 
                                             evt.loaded / evt.total));
                });
            }
        };
        
        
    
        ctrl.guardar = function() {
            console.dir(ctrl);
            $http({
                url: 'http://localhost:3000/imagenes/api/post',
                method: "POST",
                data: ctrl
            }).success(function(data, status, headers, config){
                console.log(data);
                $location.path('/');
            }).error(function(data, status, headers, config) {
                console.log(status);
                
            });
        };
            
    }]);
            
})();

*/