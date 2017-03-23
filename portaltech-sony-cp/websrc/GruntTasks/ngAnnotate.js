module.exports = function (grunt) {
    return {
        minify: {
            files: [
                {
                    src: grunt.config.get('dist') + '/concat.js',
                    dest: grunt.config.get('dist') + '/annotate.js'
                }
            ]
        }
    };
};
