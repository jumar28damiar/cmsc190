'use strict';

const _         = require('lodash');
const winston   = require('winston');

const config  = {
    APP_NAME: 'PEWON Watershed Monitoring System API',
    APP_URL: 'http://localhost:80',
    PORT: 80,
    COOKIE_SECRET: 'p1w0n',
    COOKIE_NAME: 'peewoon',
    // Directories
    // DIR: {
    //     ASSETS: __dirname + '/../../frontend'
    // },

    use: (env) => {
        _.assign(config, __dirname + '/env/' + env);
        config['ENV'] = env;
    }
};

if (!process.env.NODE_ENV) {
    if (!process.argv[2]) {
        winston.log('info', 'No environment argument. Defaulting to development environment.');
        process.env.NODE_ENV = 'development';
    }
    else {
        process.env.NODE_ENV = process.argv[2] === 'dev' ? 'development' : process.argv[2];
    }
}

module.exports = config;
