
// MessageBundle filter
// this filter is ONLY point to suplly message to entier appliction
// if you wnat to use in your controller , service
// i.e: $filter('messageBundle')('your.message.key')
// if you want to use in html, please use 'messageBundle' directive
angular.module('messageBundle').filter('messageBundle',
    function(messageBundleServiceCore){
        return function(key, bundle) {
            bundle = bundle || 'concept';
            this.message = messageBundleServiceCore.message(bundle, key);
            return this.message;
        };
    }
);