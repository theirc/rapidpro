module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');

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
                flatten: false,
                cwd: __dirname + "/static/coffee/",
                src: ['**/*.coffee'],
                dest: __dirname + '/static/js/',
                ext: '.js'
            }
        },

        less: {
            compile: {
                expand: true,
                flatten: false,
                cwd: __dirname + "/static/less/",
                src: ['**/*.less'],
                dest: __dirname + '/static/css/',
                ext: '.css'
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
