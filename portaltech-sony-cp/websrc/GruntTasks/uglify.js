module.exports = function (grunt) {
    return {
        js: {
            files: [
                {
                    src: grunt.config.get('dist') + '/annotate.js',
                    dest: grunt.config.get('dist') + '/min.js',
                }
            ]
        }
    };
};
