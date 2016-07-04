(function() {
    'use strict';

    var core = angular.module('core');

    var appConfig = {
        appErrorPrefix: '[TouchNote] ',
        appTitle: 'TouchNote',
        version: '1.0'
    };

    core.value('appConfig', appConfig);

    configure.$inject = [ '$logProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', 'AnalyticsProvider', 'config',
                    'statehelperConfigProvider', 'exceptionHandlerProvider', '$httpProvider', 'localStorageServiceProvider', 'FacebookProvider' ];

    core.config(configure);

    function configure($logProvider, $locationProvider, $stateProvider, $urlRouterProvider, AnalyticsProvider, config,
                        statehelperConfigProvider, exceptionHandlerProvider, $httpProvider, localStorageServiceProvider, FacebookProvider) {

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.timeout = 1000;

        // Configure the common route provider
        statehelperConfigProvider.config = {
            $stateProvider: $stateProvider
        };

        var resolveAlways = { /* @ngInject */

            api: function(ApiService) {
                return api
            }

        };

        // Google Analytics
        // https://github.com/revolunet/angular-google-analytics
        var GADomain = {
            tracker: 'UA-36630454-8',
            fields: {
                cookieDomain: 'angular.touchnote.com',
                cookieName: 'touchnote.com',
                cookieExpires: 20000
              },
            trackEvent: true,
            name:'angular.touchnote.com'
        };

        AnalyticsProvider.setAccount(GADomain)
                        .delayScriptTag()
                        .useAnalytics(false)
                        .trackPages(true)
                        .logAllCalls(true)
                        .setPageEvent('$stateChangeSuccess')
                        .trackPrefix('angular.touchnote.com')
                        .setDomainName('none');

        // Add Interceptor
        $httpProvider.interceptors.push('authenticationInterceptor');

        $urlRouterProvider.rule(function($injector, $location) {

            var path = $location.path();
            var hasTrailingSlash = path[path.length-1] === '/';

            if (hasTrailingSlash) {

                //if last charcter is a slash, return the same url without the slash
                var newPath = path.substr(0, path.length - 1);
                return newPath;

            }

        });

        statehelperConfigProvider.config.resolveAlways = resolveAlways;

        // Configure the common exception handler
        exceptionHandlerProvider.configure(appConfig.appErrorPrefix);

        // Remove /#/ from URL
        if (window.useHTML5mode === true) {
            $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
        }

        // Redirect Empty URL
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise(function($injector, $location){
           $location.path('/errors/404').replace();
        });
        URLRedirecting($urlRouterProvider);

        // Setup local-storage and cookie
        localStorageServiceProvider
            .setPrefix('')
            .setStorageCookie(45, '/');

        // Facebook ID
        FacebookProvider.init( config.facebook.id );

        //paymentServiceProvider.initialize();

        //Facebook Pixel tracking
        fbq('init', '1374782902834017');
        fbq('track', 'ViewContent', {'content_name':'Home'});
    }


    function URLRedirecting($urlRouterProvider) {
        $urlRouterProvider.when('/', '/home');
        $urlRouterProvider.when('/cta', '/home');
        $urlRouterProvider.when('/credits', '/home');
        $urlRouterProvider.when('/facebook/index', '/home');
        $urlRouterProvider.when('/m/me/credit', '/home');
        $urlRouterProvider.when('/m/me/wcj1', '/home');
        $urlRouterProvider.when('/m/me/logo', '/home');
        
        $urlRouterProvider.when('/addresses', '/account/addressbook');
        $urlRouterProvider.when('/postcard', '/cardBuilder/NEW');
        $urlRouterProvider.when('/greetingcard', '/greetingCard/NEW');

        $urlRouterProvider.when('/postbox', '/account/cards');
        $urlRouterProvider.when('/photoframe', '/account/cards');
        $urlRouterProvider.when('/m/me/postbox', '/account/cards');
        $urlRouterProvider.when('/account/home', '/account/cards');
        
        $urlRouterProvider.when('/account/credits', '/account/buycredit');
        $urlRouterProvider.when('/info/help#Printing-and-posting', '/info/help#Printing-and-posting');

        $urlRouterProvider.when('/jobs', '/info/jobs');
        $urlRouterProvider.when('/help', '/info/help');
        $urlRouterProvider.when('/press', '/info/press');
        $urlRouterProvider.when('/blog', '/info/blog');
    }
})();
