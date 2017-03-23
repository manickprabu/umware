'use strict';

angular.module('sharedFile').directive('sharedFile', 
    function sharedFile(conceptWidgetServiceFileAttachment, FileUploader) {
    return {
        restrict: 'A',
        scope: {
            sharedFile: '=',
            fieldLanguage: '@',
            readOnly: '=',
            totalFilesAllowed : '@'
        },
        templateUrl: function($element, $attr) {
            if($attr.readOnly) {
                return 'app/shared/file/file-list-readonly.html';
            }
            return 'app/shared/file/file-upload.html';
        },
        controller: function controller($scope) {

            if (!$scope.sharedFile) {
                throw new Error([
                    'sharedFile directive element: Expected a conceptWidgetServiceFileAttachment instance.'
                ].join(''));
            }

            // Reference : https://github.com/nervgh/angular-file-upload
            var fileFactory = $scope.sharedFile;            

            var uploader;
            /*
            *  If there is totalFilesAllowed attribute there, then it means there is limit 
            *  of files allowed to be attached otherwise, allow multiples - means no limit
            */

            fileFactory.language = $scope.fieldLanguage;
            $scope.value = fileFactory.value;  
            uploader = $scope.uploader = new FileUploader({}); 
            if(($scope.totalFilesAllowed) && ($scope.totalFilesAllowed !== undefined )) { 
                /*
                *  Override the existing built-in queueLimit function
                */
                uploader.filters.push({
                    name: 'queueLimit',
                    fn: function(item, options) { 
                            var len = $scope.value().length;
                            var qLen = uploader.queue.length;
                                return ( (len + qLen) < $scope.totalFilesAllowed);
                        }
                    });
            }; 

            $scope.removeAll = function(fileItems,$event) {
                uploader.cancelAll();
                uploader.clearQueue();

                fileFactory.removeAll();
                $scope.value = fileFactory.value;
                $scope.stopProp($event);
            }

            $scope.removeFile = function(fileItem,$event) {
                fileFactory.remove(fileItem.id);
                /*
                *  When removed from the attachment zone, the queue must be 
                *  cleared as well. So this below check validates 
                *  that
                */               

                if((fileFactory.value()) && (fileFactory.value().length==0)) {                    
                    uploader.clearQueue();
                };

                // Prevent bubbling to showItem.
                $scope.stopProp($event);
            }

            $scope.stopProp = function($event) {
                // Prevent bubbling to showItem.
                if ($event.stopPropagation) $event.stopPropagation();
                if ($event.preventDefault) $event.preventDefault();
                $event.cancelBubble = true;
                $event.returnValue = false;
            };          

            uploader.onAfterAddingFile = function(fileItem) {               
                fileFactory.upload(fileItem._file, function(data) {
                    // fileItem.id = data.id;
                });
            };
        },
        link: function($scope, $element, $attr) {
            if($attr.readOnly) {
                return;
            }
            
            angular.element($element).on('click',function(e) {
                //activates a click for the hidden file upload field
                $element.find('input')[0].click(); 
                e.stopImmediatePropagation();
            });
        }
    }; 
});
