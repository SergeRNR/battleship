"use strict";

var env = 'development';

module.exports = {

    css: {
        autoprefixer: {
            browsers: ['last 2 versions']
        },
        errorLogToConsole: true
    },

    server: {
        env: env,
        debugPort: 5857
    }
};
