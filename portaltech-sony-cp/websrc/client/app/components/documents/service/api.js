/*
    this serivce to upload file attachment
*/
'use strict';

angular.module('documents').service('documentsService',
function documentsService($http, sharedAPIConstantURL, oauth2FactoryHeaders) {
    this.api = function api(language, file) {

        var formData = new FormData();
            formData.append('file', file);
            formData.append('language', language);

        return $http.post(sharedAPIConstantURL + '/documents', formData, {
            transformRequest: angular.identity,
            headers: angular.extend(
                oauth2FactoryHeaders(),
                { 'Content-Type': undefined }
            )
        });
 
    };
});
