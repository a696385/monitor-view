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
    },
    //
    // instances
    //
    instances: {
        path:       '/instances/?',
        module:     'frontend',
        controller: 'instances',
        action:     'index'
    },
    //
    // blocks
    //
    blocks: {
        path:       '/blocks/?',
        module:     'frontend',
        controller: 'blocks',
        action:     'index'
    },
    //
    // block by Id
    //
    blockById: {
        path:       '/blocks/:id/?',
        module:     'frontend',
        controller: 'blocks',
        action:     'byId'
    },
    //
    // stat
    //
    stat: {
        path:       '/stat/?',
        module:     'frontend',
        controller: 'stat',
        action:     'index'
    }
};