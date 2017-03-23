module.exports = function Gruntfile(grunt) {
    require('./config/grunt')(grunt);

    // Loads in each grunt task from its own file.
    [
        'accessibility', // WCAG compliance
        'concat', // Concatenates files together
        'connect', // Server task
        'copy', // File copying
        'eslint', // Javascript linting
        'htmlangular', // W3C compliance
        'jasmine', // Runs unit tests
        'ngAnnotate', // Annotates the angular components for minification.
        'ngtemplates', // Bundles angular partial html into javascript
        // Disabled SASS due to CSS being provided from outside.
        // 'sass', // Runs SASS transpilation
        'template', // Generates html templates.
        'uglify', // Creates a minified concat file.
        'watch' // Watches for file changes and runs tasks
    ].forEach(function forEachTask(taskName) {
        grunt.config.set(taskName, require('./GruntTasks/' + taskName)(grunt));
    });

    // By default, grunt watches for file changes and bundles the code for distribution.
    grunt.registerTask('default', ['watch:src']);

    // Runs the server which serves the SPA into the localhost.
    // File changes restart the server.
    // grunt.registerTask('serve', [
    //     'connect:livereload', // The server
    //     'watch:src' // The watch which checks for code changes and triggers the server reload
    // ]);

    // No CSS tasks are currently required since we're being provided with the CSS.
    // grunt.registerTask('css', [
    //     'concat:sass',
    //     'sass:dist'
    // ]);

    // This task concatenates all the javascript together, including the html templates.
    grunt.registerTask('bundle', [
        // Disabled superfluous CSS task.
        // 'css', // SASS transpiling
        'copy:font', // Twitter Bootstrap font copying
        'template:index', // Index file copy
        // 'concat:css', // CSS concatenation
        'concat:js', // Javascript concatenation
        'ngtemplates' // Angular partials to be included
    ]);

    // Watches for code changes and lists any issues
    grunt.registerTask('report', ['watch:report']);

    // Runs all lint tasks
    grunt.registerTask('lint', [
        'accessibility',
        'eslint',
        'htmlangular'
    ]);

    // Runs tests
    grunt.registerTask('test', [
        'jasmine:summary',
        // 'jasmine:app', // Commented due to unnecessary memory usage.
        //'jasmine:coverage'
    ]);

    // Minifiy
    grunt.registerTask('minify', [
        'bundle',
        'ngAnnotate',
        'uglify:js',
        'template:index:minify'
    ]);

    // Load task libraries
    require('load-grunt-tasks')(grunt, {
        // Without this, jasmine instanbul coverage generates an annoying error message.
        pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });
    require('time-grunt')(grunt);
};
