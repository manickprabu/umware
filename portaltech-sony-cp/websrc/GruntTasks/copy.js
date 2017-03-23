/*
* Grunt Task - Copy
* https://github.com/gruntjs/grunt-contrib-copy  version ^1.0.0
* - Copy folders to correct the location for build application
*/
module.exports = function copy(grunt) {
    return {
        font: {
            expand: true,
            cwd: 'node_modules/bootstrap/',
            src: 'fonts/*',
            dest: grunt.config.get('dist')
        },
        index: {
            expand: true,
            cwd: 'client/',
            src: 'index.html',
            dest: grunt.config.get('webRoot')
        }
    };
};
