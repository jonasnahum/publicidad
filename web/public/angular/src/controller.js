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
                url: '/empresa',
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
                    //$timeout(function () {
                      //  ctrl.result = response.data;
                    //});
                    ctrl[propertyName] = response.data;
                                        
                    alert("Regreso serial");
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

/*
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
                    alert('Eureka22');
                }, function (response) {
                    if (response.status > 0)
                        ctrl.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    ctrl.f.progress = Math.min(100, parseInt(100.0 * 
                                             evt.loaded / evt.total));
                });
            }   
        }
  
*/