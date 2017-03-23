/*
* Grunt Task - html-angular-validate
* https://www.npmjs.com/package/grunt-html-angular-validate version ^0.5.7
*   - HTML validtor for angular apps
*   - Validate for partials and index
*/

module.exports = function htmlangular(grunt) {
    grunt.loadNpmTasks('grunt-html-angular-validate');

    // Partial directives could be auto-relaxed using strict file-structuring protocol.
    return {
        options: {
            reportpath: 'report/html-angular-validate-report.json',
            reportCheckstylePath: null
        },
        partial: {
            files: {
                src: ['client/app/**/*.html']
            },
            options: {
                relaxerror: [
                    [
                        'Start tag seen without seeing a doctype first. ',
                        'Expected e.g. “<!DOCTYPE html>”.'
                    ].join(''),
                    'Element “head” is missing a required instance of child element “title”.',
                    [
                        'This document appears to be written in English. ',
                        'Consider adding “lang="en"” (or variant) to the “html” start tag.'
                    ].join('')
                ]
            }
        },
        index: {
            files: {
                src: ['client/index.html']
            }
        }
    };
};
