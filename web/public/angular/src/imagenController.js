(function() {
   //inject angular file upload directives and services.
    var app = angular.module('app');

    app.controller('MyCtrl', ['Upload', '$timeout', function (Upload, $timeout) {
        var ctrl = this;
        
        ctrl.f = undefined;
        ctrl.errFile = undefined;
        ctrl.errorMsg = undefined;
        
        ctrl.uploadFiles = function(file, errFiles) {
            ctrl.f = file;
            ctrl.errFile = errFiles && errFiles[0];
            if (ctrl.f) {
                ctrl.f.upload = Upload.upload({
                    url: 'http://localhost:3000/imagenes/api/post',
                    data: {file: file}
                });

                ctrl.f.upload.then(function (response) {
                    alert("archivo cargado satisfactoriamente");
                    $timeout(function () {
                        ctrl.f.result = response.data;
                    });
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
