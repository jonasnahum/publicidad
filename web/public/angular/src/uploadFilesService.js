(function() {
    var app = angular.module('app');
    
    app.factory('uploadFilesService', ['Upload', function(Upload) {//singleton.
        
        var UploadFiles = function() {
        }
        
        UploadFiles.prototype.upload = function (files, errFiles, propertyName, callback , error, progres) {
            if (files && files.length) {
                Upload.upload({
                    url: 'http://localhost:3000/imagenes/api/post',
                    data: {
                        files: files
                    }
                }).then(callback,error,progres);
            }
        };       
        return function() {
            return new UploadFiles();
        };
        
    }]);
})();