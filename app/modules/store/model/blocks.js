/**
 * Powered by Andy <andy@away.name>
 * Date: 28.08.13
 */

var $swift = require('swift.mvc'),
    errors = $swift.require(':app/helpers/errors'),
    config = $swift.extra('config'),
    uuid = require('uuid');

exports.get = function(callback){
    callback(null, config.data.blocks || []);
};

exports.set = function(id, data, callback){
    data.id = id;
    if (config.data.blocks == null) config.data.blocks = [];
    for(var i = 0; i < config.data.blocks.length; i++){
        if (config.data.blocks[i].id === id){
            config.data.blocks[i] = data;
            config.save(function(err){
                callback(err, data);
            });
            return;
        }
    }
};

exports.create = function(data, callback){
    data.id = uuid.v4();
    if (config.data.blocks == null) config.data.blocks = [];
    config.data.blocks.push(data);
    config.save(function(err){
        callback(err, data);
    });

};

exports.remove = function(id, callback){
    if (config.data.blocks == null) config.data.blocks = [];
    for(var i = 0; i < config.data.blocks.length; i++){
        if (config.data.blocks[i].id === id){
            config.data.blocks.splice(i, 1);
            config.save(function(err){
                callback(err, true);
            });
            return;
        }
    }
};

exports.sort = function(ids, callback){
    if (config.data.blocks == null) config.data.blocks = [];
    config.data.blocks = ids.map(function(id){
        for(var i = 0; i < config.data.blocks.length; i++){
            if (config.data.blocks[i].id === id){
                return config.data.blocks[i];
            }
        }
        return null;
    }).filter(function(el) { return el != null});
    config.save(function(err){
        callback(err, true);
    });
};
