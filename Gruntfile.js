module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-coffee');

    var coffeeTask = {
        expand: true,
        cwd: "./Scripts",
        src: ["**/*.coffee"],
        dest: "./Scripts",
        ext: ".js"
    };

    grunt.initConfig({
        coffee: {
            compile: {
                expand: true,
                flatten: true,
                cwd: __dirname + "/static/",
                src: ['**/*.coffee'],
                dest: __dirname + '/static/',
                ext: '.js'
            }
        }
    });
    grunt.registerTask('install', 'install the backend and frontend dependencies', function () {
        var exec = require('child_process').exec;
        var cb = this.async();

        exec('npm install less coffee-script -g', {}, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            exec('npm install', {}, function (err, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                exec('node node_modules/bower/bin/bower install', {}, function (err, stdout, stderr) {
                    console.log(stdout);
                    console.log(stderr);
                    cb();
                });
            });
        });


    });

    grunt.registerTask('dokku:production', ['install', 'coffee']);

}
