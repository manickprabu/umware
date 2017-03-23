module.exports = function watch(grunt) {
    // When reporting, set up a special watch event trigger to run linting against
    // specific files
    var tasks = [
        // Cannot include accessibility task as this hangs the watch.
        ['eslint.app.src', 'eslint', 'app'],
        ['eslint.grunt.src', 'eslint', 'grunt'],
        // ['eslint.gruntFile.src', 'eslint', 'gruntFile'],
        // This is spawning multiple processes for some reason so I'm disabling it.
        ['eslint.spec.src', 'eslint', 'spec'],
        ['htmlangular.index.files.src', 'htmlangular', 'index'],
        ['htmlangular.partial.files.src', 'htmlangular', 'partial']
    ].map(function forEachTaskData(taskData) {
        // Todo: In theory this could contain the original config source glob.
        // There could be a function which resets all configs to these source globs.
        var src = taskData[0];
        return {
            config: grunt.config(src),
            src: src,
            name: taskData[1],
            target: taskData[2]
        };
    });

    // To run certain tasks and targets, all files are watched and compared to the config
    // src task blobs. The result is that when a file is changed, only tasks which run against
    // a blob which matches that file are run. They are run only against that file.

    // Currently this event is duplicated each time the watch config reloads, which should
    // be never, but instead happens whenever GruntFile.js is changed.
    grunt.event.on('watch', function event(action, filepath, target) {
        var tasksToRun = [];
        if (target === 'report') {
            // Reset all configs
            tasks.forEach(function resetConfigs(task) {
                grunt.config(task.src, task.config);
            });

            tasks.forEach(function forEach(task) {
                // Check if the file changed matches the task source.
                if (grunt.file.isMatch(grunt.config(task.src), filepath)) {
                    // Set the config to the current filepath.
                    grunt.config(task.src, filepath);

                    // Push the task into the list to run.
                    tasksToRun.push([task.name, task.target].join(':'));
                }
            });
            if (tasksToRun.length) {
                // Runs the tasks within the watch event.
                // This is supposed to be the wrong way to do it, but the right way
                // doesn't work at all.
                grunt.task.run(tasksToRun);
            }
        }
    });

    return {
        options: {
            spawn: false
        },
        src: {
            options: {
                // reload: false, // I don't currently trust this property to be declared at all.
                // Reload is set to false because the reload was setting SPA changes a version
                // behind.
                // For the same reason, the concat task file is not watched for changes.
                livereload: {
                    port: 35729, // Default
                    key: grunt.file.read('config/sonycp.local.key'),
                    cert: grunt.file.read('config/sonycp.local.crt')
                }, // Responds to adding and changing files.
                atBegin: true // Runs tasks once when initiated.
            },
            files: [
                'client/app/**',
                'client/assets/**',
                'client/index.html'
            ],
            tasks: ['bundle']
        },
        report: {
            // Attached to linting tasks on a per-file basis in the main grunt file.
            options: {
                debounceDelay: 500, // This is the default value, but it might be worth
                // experimentation
                livereload: 2351, // Responds to adding and changing files
                event: ['added', 'changed']
                // reload: false // If set at all, watch reloads.
                // Watch cannot reload for this task.
            },
            files: [
                'GruntFile.js',
                'GruntTasks/**',
                'client/app/**',
                'client/index.html',
                'unittest/spec/**'
            ]
        },
        test: {
            options: {
                livereload: 8082, // Responds to adding and changing files
                // reload: false, // If set to true, the tasks run against all files.
                atBegin: true,
                event: ['added', 'changed']
            },
            files: [
                'client/app/module.js',
                'client/app/**/*.js',
                'unittest/spec/*.js',
                'unittest/spec/**/*.js'
            ],
            tasks: ['test']
        }
    };
};
