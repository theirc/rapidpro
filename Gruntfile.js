module.exports = function (grunt) {

    grunt.registerTask('install', 'install the backend and frontend dependencies', function () {
        var exec = require('child_process').exec;
        var cb = this.async();

        exec('npm install less -g', {}, function (err, stdout, stderr) {
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


    var gtx = require('gruntfile-gtx').wrap(grunt);

    gtx.loadAuto();

    gtx.alias('dokku:production', ['install']);

    gtx.finalise();
}
