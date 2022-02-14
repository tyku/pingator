const handlers = require('./handlers');
const { NOT_FOUND } = require('../constants');

function findRoute(method, url, middleware) {
    let route = (req, res) => {
        res.writeHead(NOT_FOUND);
        res.end('Not Found');
    };

    for(let key in handlers) {
        const foundedRouter = handlers[key].getHandler(`${method}${url}`);

        if (foundedRouter) {
             route = foundedRouter;
        }
    }

    return (req, res) => middleware(req, res, route);
}

module.exports = findRoute;
