(function() {
    var app = angular.module('app');
    
    app.factory('uploadFilesService', ['Upload', function(Upload) {//singleton.
        
        var UploadFiles = function() {
        }
        
        UploadFiles.prototype.upload = function (files, errFiles, propertyName, ctrl) {
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
        return function() {
            return new UploadFiles();
        };
        
    }]);
})();