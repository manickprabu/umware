/*
* Grunt Task - EsLint
* https://www.npmjs.com/package/eslint version ^2.10.1
* - Linting for app js files, unittests, Grunt tasks and Grunt file
* - Custom config inside configFile
*/

module.exports = function eslint() {
    return {
        app: {
            options: {
                configFile: 'config/eslint-app.json'
            },
            src: ['client/app/**/*.js']
        },
        spec: {
            options: {
                configFile: 'config/eslint-spec.json'
            },
            src: ['unittest/spec/**/*.js']
        },
        grunt: {
            options: {
                configFile: 'config/eslint-grunt.json'
            },
            src: ['GruntTasks/*.js']
        },
        gruntFile: {
            options: {
                configFile: 'config/eslint-grunt.json'
            },
            src: ['GruntFile.js']
        }
    };
};
