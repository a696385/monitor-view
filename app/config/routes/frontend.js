module.exports = {
    //
    // home page
    //
    index: {
        path:       '/?',
        module:     'frontend',
        controller: 'index',
        action:     'index'
    },
    //
    // server config
    //
    serverConfig: {
        path:       '/config/server/?',
        module:     'frontend',
        controller: 'config',
        action:     'server'
    },
    //
    // counters
    //
    counters: {
        path:       '/counters/?',
        module:     'frontend',
        controller: 'counters',
        action:     'index'
    }
};