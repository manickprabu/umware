module.exports = function concat(grunt) {
    return {
        options: {
            separator: ';\n'
        },
        js: {
            src: [
                'node_modules/angular/angular.js',
                'node_modules/angular-mocks/angular-mocks.js',
                'node_modules/jquery/dist/jquery.js',
                'node_modules/bootstrap/dist/js/bootstrap.js',
                'node_modules/angular-oauth2/node_modules/angular-cookies/angular-cookies.js',
                'node_modules/angular-oauth2/node_modules/query-string/query-string.js',
                'node_modules/angular-oauth2/dist/angular-oauth2.js',
                'node_modules/angular-ui-router/release/angular-ui-router.js',
                'node_modules/angular-touch/angular-touch.js',
                'node_modules/angular-file-upload/dist/angular-file-upload.js',
                'node_modules/angularjs-dropdown-multiselect/dist/angularjs-dropdown-multiselect.min.js',
                'node_modules/angular-animate/angular-animate.js',
                'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',

                'client/app/module.js',
                'client/app/*/*/module.js',
                'client/app/**/*.js',
                '!client/app/**/*-test*.js'
            ],
            dest: grunt.config.get('dist') + '/concat.js',
            footer: 'window.angular = angular;'
        },
        // css: {
        //     src: [
        //         'node_modules/bootstrap/dist/css/bootstrap.css'
        //     ],
        //     dest: grunt.config.get('dist') + '/css/content-pipeline.css'
        // },
        sass: {
            src: [
                'node_modules/bootstrap/dist/css/bootstrap.css',
                grunt.config.get('dist') + '/assets/**/*.scss'
            ],
            dest: grunt.config.get('dist') + '/css/concat.scss'
        }
    };
};
