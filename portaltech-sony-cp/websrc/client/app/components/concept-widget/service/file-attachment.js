// Todo:
// 1 - It should probably be in conceptCommon because it handles functionality common to concepts.
//      That means the file should be moved to 'concept-common/factory', the module should be 
//      changed to conceptCommon and the name changed to 'conceptCommonFactoryFileUpload'

'use strict';

angular.module('conceptWidget').factory('conceptWidgetServiceFileAttachment', 
    function (documentsService) {

    function FileAttachment(options) {
        var callBack, files;
        
        this.language = 'en';

        this.remove = function (fileId) {
            files = this.value();

            for(var i = 0; i<files.length; i++) {
                if(files[i].id == fileId) {
                    files.splice(i, 1);
                }
            }
            this.value(files);
        };

        this.removeAll = function() {
            this.value([]);
        };

        this.upload = function (file, _callBack) {
            callBack = _callBack
            documentsService.api(this.language, file).then(angular.bind(this, this._success, file) );
        }

        this._success = function(file, response) {
            var fileObj = response.data;
            fileObj.name = file.name;
            fileObj.size = file.size;

            //concat with existing files
            this.value( this.value().concat(fileObj) );

            if(typeof callBack ==  'function') {
                callBack.call(null, fileObj);
            }
        }

        //setter & getter
        //update field.value soon user upload / remove files
        this.value = function(fileList) {
            files = options.value() || [];

            //setter files 
            if(fileList) {
                options.value(fileList);
            }

            //getter files
            return files.map(function(file){
                //extent with custom methods for UI
                angular.extend(file, methods);
                return file;
            });
        }

        //helper methods
        methods = {
            filename : function() {
                if(this.uri) {
                    return this.uri.substring(this.uri.lastIndexOf('/')+1);
                }
                return this.name || 'No Name';
            },
            filesize : function() {
                return ( (this.size||0) /1024/1024) + ' MB';
            }
        }

    };

    return function (options) {
        return new FileAttachment(options);
    }
});
