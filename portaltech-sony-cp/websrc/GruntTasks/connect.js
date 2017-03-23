module.exports = function connect(grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');

    return {
        options: {
            livereload: true
        },
        livereload: {
            options: {
                hostname: 'localhost',
                port: 8080,
                base: 'client/',
                open: true
            }
        },
        test: {
            options: {
                hostname: 'localhost',
                port: 9000,
                base: 'unittest/',
                open: true,
                keepalive: true
            }
        }
    };
};
