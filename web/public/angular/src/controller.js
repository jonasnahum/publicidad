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
   
        ctrl.serial = [];
        
        ctrl.uploadFiles = function (files) {
        ctrl.files = files;
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
                ctrl.serial.push(response.data);
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
 //============================================================
      //  ctrl.uploadFiles = function(file, errFiles) {
          //  ctrl.f = file;
        //    ctrl.errFile = errFiles && errFiles[0];
          
 
        
        
        
        
        
    }]);
    
})();

/*
<button type="file"  
                       ngf-select="ctrl.uploadFiles($files, $invalidFiles)" multiple
                       accept="image/*" ngf-max-height="3000" 
                       ngf-max-width="3000" ngf-max-size="1MB"
                      >Select Files</button>
            <br><br>
            Files:
            <ul>
                <li ng-repeat="f in files" style="font:smaller">{{f.name}} {{f.$errorParam}}
                    <span class="progress" ng-show="f.progress>0">
                        <div style="width:{{f.progress}}%" ng-bind="f.progress + '%'"></div>
                    </span>
                </li>
                <li ng-repeat="f in errFiles", style="font:smaller">{{f.name}} {{f.$error}} {{f.$errorParam}}
                </li>
            </ul>
            {{errMsg}}



        ctrl.f = undefined;
        ctrl.errFile = undefined;
        ctrl.errorMsg = undefined;
        ctrl.serial = undefined;
        
        ctrl.uploadFiles = function(files, errFiles) {
            ctrl.files = files;
            ctrl.errFiles = errFiles;
            angular.forEach(files, function(file) {
                file.upload = Upload.upload({
                    url: 'http://localhost:3000/imagenes/api/post',
                    data: {file: file}
                });
               
                file.upload.then(function(response) {
                    $timeout(function() {
                        file.result = response.data;
                    });
                },  function(response) {
                    if(response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data; 
                }, function(evt)  {
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
                
            });
        }
        
*/
/*
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
                    alert("EUREKA");
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