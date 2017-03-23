module.exports = function (grunt) {
    var files = {};
    files[grunt.config.get('webRoot') + '/index.html'] = 'client/index.html.tpl';
    return {
        index: {
            options: {
                data: {
                    src: function () {
                        var fileName = 'dist/concat.js';
                        if (grunt.task.current.flags.minify) {
                            fileName = 'dist/min.js';
                        }
                        return fileName;
                    }
                }
            },
            files: files
        }
    }    
};
