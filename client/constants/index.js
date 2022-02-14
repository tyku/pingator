const httpMethods = require('./http-methods');

const REQUEST_INTERVAL = 1000;

module.exports = {
    REQUEST_INTERVAL,
    ...httpMethods,
};
