module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        server: {
            port: 8080
        }
    });

    grunt.registerTask('default', 'Starting the server', function () {
        require('./app.js');
    })


}
