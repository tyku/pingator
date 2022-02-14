const http = require('./http');
const server = require('./server');
const httMethods = require('./http-methods');

module.exports = {
    ...http,
    ...server,
    ...httMethods,
};
