/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */

var $path = require('path'),
    $fs = require('fs'),

    $swift = require('swift.mvc'),

    $express = $swift.express,
    $memoryStore = $express.session.MemoryStore,

    $redis = require('redis');

var errors = require('./app/helpers/errors'),
    logger = require('./app/helpers/logger');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// swift ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
$swift.disableLog().init(function (err, app)
{
    if (err)
    {
        throw err;
    }

    var config = $swift.configurator.getConfig();
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // настройка приложения ////////////////////////////////////////////////////////////////////////////////////////////
    //
    // common
    //
    app.configure(function (){});

    //
    //
    //
    var extendResponse = function(req, res, next){
        res.success = function(data){
            res.json({result: data});
        };
        res.error = function(err){
            res.json({error: err});
        };
        next();
    };
    //
    // production
    //
    app.configure('production', 'test', function ()
    {
        app.use($express.favicon());
        app.use($express.static($path.join(__dirname, 'static')));
        app.use($swift.router.endslash);
//        app.use($express.logger());
        app.use($express.bodyParser({ uploadDir: $path.join(__dirname, config.application.uploadDir) }));
        app.use($express.cookieParser());
        app.use($express.session({
            store:  new $memoryStore( config.application.session.memoryStore ),
            secret: config.application.session.secret,
            maxAge: config.application.session.maxAge,
            cookie: { maxAge: config.application.cookie.maxAge }
        }));
        app.use(extendResponse);
        app.use(app.router);
        app.use(function (req, res, next) { res.send(new Error().status = 404); });
    });
    //
    // development
    //
    app.configure('development', 'prog12', 'prog28', 'user316', function ()
    {
        app.use($express.favicon());
        app.use($express.static($path.join(__dirname, 'static')));
        app.use($swift.router.endslash);
        app.use($express.logger('dev'));
        app.use($express.bodyParser({ uploadDir: $path.join(__dirname, config.application.uploadDir) }));
        app.use($express.cookieParser());
        app.use($express.session({
            store:  new $memoryStore( config.application.session.memoryStore ),
            secret: config.application.session.secret,
            maxAge: config.application.session.maxAge,
            cookie: { maxAge: config.application.cookie.maxAge }
        }));
        app.use(extendResponse);
        app.use(app.router);
        app.use(function (req, res, next) { res.send(new Error().status = 404); });
        app.use($express.errorHandler());
    });
    //
    // настройка приложения ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // модули //////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    $swift.extra('config', {
        data: $swift.require(':app/config/user.json'),
        save: function(callback){
            $fs.writeFile($path.join(__dirname, 'app', 'config', 'user.json'), JSON.stringify(this.data, null, 4), callback);
            $swift.extra('db').connect();
        }
    });
    $swift.extra('db', {
        config: $swift.extra('config'),
        read: null,
        write: null,
        _connected: {
            read: false,
            write: false
        },
        connect: function(){
            var self = this;
            self.disconnect();
            if ((config.data || {}).server == null) return;
            this.write = $redis.createClient(this.config.data.server.port, this.config.data.server.host, this.config.data.server.options);
            this.write.on('connect', function(){
                self._connected.write = true;
            });
            this.write.on('error', function(err){
                self._connected.write = false;
            });

            this.read = $redis.createClient(this.config.data.server.port, this.config.data.server.host, this.config.data.server.options);
            this.read.on('connect', function(){
                self._connected.read = true;
            });
            this.read.on('error', function(err){
                self._connected.read = false;
            });
        },
        disconnect: function(){
            if (this.write) {
                this.write.end();
                this.write = null;
            }
            if (this.read) {
                this.read.end();
                this.read = null;
            }
        }
    });
    var config = $swift.extra('config');
    if ((config.data || {}).server != null){
        $swift.extra('db').connect();
    }
    $swift.moduleManager
        .loadModule('store')
        .loadModule('frontend')
        .$swift()
        .run(function (err)
        {
            if (err){
                logger.log('error', new errors.S1000(err));
                throw err;
            }
        })
    ;
    //
    // модули //////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
//
// swift ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////