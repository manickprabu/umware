'use strict';

var App = angular.module('authentication');
var conceptProposal = angular.module('conceptProposal');

angular.module('authentication').run(function ($state, $rootScope, oauth2401Redirect, FileUploader) {
    oauth2401Redirect.url($state.get('index.login').url);

    //just to ignore global native drag & drop;
    //<body nv-file-over="" nv-file-drop="" uploader="uploader">
    $rootScope.uploader = new FileUploader({});
});
