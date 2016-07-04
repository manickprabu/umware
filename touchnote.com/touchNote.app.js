(function() {
    'use strict';

    var app = angular.module('touchNote', [
        'core',
        'templates',
        'hmTouchEvents',
        'ngFileUpload',
        'angularMoment',
        'touchNote.common',
        'touchNote.account',
        'touchNote.feedback',
        'touchNote.invitee',
        'touchNote.contacts',
        'touchNote.content',
        'touchNote.creditPacks',
        'touchNote.cardBuilder',
        'touchNote.greetingCard',
        'touchNote.development',
        'touchNote.payment',
        'touchNote.authentication',
        'touchNote.homepage',
        'touchNote.resetpassword',
        'touchNote.errors',
        'braintree-angular',
        'angularPayments',
        //'paymentService'
    ]);

    app.run(initialize);

    // Hoistable Methods
    initialize.$inject = [ '$http', '$rootScope', '$templateCache', 'config', 'browser', 'dataStore', 'UserDetails' ];

    function initialize($http, $rootScope, $templateCache, config, browser, dataStore, userDetails) {

        // @NOTE: This could be done on the specific API level as well. Depends on a variety of things.
        $http.defaults.headers.common = {
            'Accept': 'application/json, text/plain, */*',
            //'TouchNote-Session-ID': localStorage.getItem("sessionID")
        };

        $('html').addClass( browser.get() )
                 .addClass( browser.isMobile() ? 'Mobile' : '' );

        //update userDetails object on appLoad
        if(dataStore.get('userDetails')) {
            userDetails.update(dataStore.get('userDetails'));
        }
    }

})();
