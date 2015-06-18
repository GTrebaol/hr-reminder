#!/usr/bin/env node

/**
 * Module dependencies
 */
var express = require('express'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        morgan = require('morgan'),
        http = require('http'),
        path = require('path'),
        fs = require('fs'),
        routeDir = './app/routes/',
        routeFiles = fs.readdirSync(routeDir),
        log4js = require('log4js'),
        mkdirp = require('mkdirp'),
        multer = require('multer');


app = module.exports = express();

var logPath = './logs';
var logFile = 'debug.log';

mkdirp(logPath, function (err) {
    if (err)console.log("couldn't create log directory" + err);
});

log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'file', filename: logPath + '/' + logFile, category: 'debug'}
    ]
});

var logger = log4js.getLogger('debug');

/**
 * Configuration
 */
//All environments
app.set('port', process.env.PORT || 8080);
app.set('ipaddress', process.env.IP || '127.0.0.1');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
//app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// Connection to the database based on the environment.
var conf = require('./app/config/' + env + '.conf.js');

// Register services module
var services = require('./app/services')(conf.db, logger);
app.set('services', services);


//configure multer (multipart file handling)
app.use(multer({ dest: './uploads/',
    rename: function (fieldname, filename) {
        return filename+Date.now();
    }}));

//Initializing routes
routeFiles.forEach(function (file) {
    var filePath = path.resolve(routeDir, file), route = require(filePath);
    logger.debug('Loading routes for ' + file);
    route.load(app, logger);
});

// Configure the url rewriting
app.use('/app', express.static(__dirname + '/public/app'));
app.use('/assets', express.static(__dirname + '/public/assets'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/bower_components', express.static(__dirname + '/public/bower_components')); //Replace by CDNs later on!
app.use('/partials', express.static(__dirname + '/public/partials'));

app.all('/*', function (req, res, next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
/**
 * Start Server
 */
var server = http.createServer(app);

server.listen(app.get('port'), app.get('ipaddress'), function () {
    logger.debug('Server running and listening on ' + app.get('ipaddress') + ':' + app.get('port'));
});

server.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
        console.log('Address in use, retrying...');
        setTimeout(function () {
            server.close();
            server.listen(app.get('port'), app.get('ipaddress'));
        }, 1000);
    }
});
