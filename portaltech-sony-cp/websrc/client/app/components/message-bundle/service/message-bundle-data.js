'use strict';

// Service for concept proposal
angular.module('messageBundle')
    .service('messageBundleData', function messageBundleData(messageBundleServiceCore) {

        this.applyBundles = function(bundleName, arr) {
            var result = {};
            var text;

            arr.forEach(function(item) {
                text = messageBundleServiceCore.message('concept', bundleName + '.' + item + '.name');
                result[item] = !text ? item : text;
            });

            return result;
        };
    });
