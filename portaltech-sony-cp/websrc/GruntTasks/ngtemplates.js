module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-angular-templates');

    return {
        application: {
            src: ['app/**/*.html'],
            cwd: 'client/',
            prefix: 'sonycp/',
            dest: grunt.config.get('dist') + '/concat.js',
            options: {
                append: true                
            }
        }
    };
};
