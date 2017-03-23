module.exports = function (grunt) {
    grunt.config.set('webRoot', '../webroot');
    grunt.config.set('dist', [grunt.config.get('webRoot'), 'dist'].join('/'));
};
