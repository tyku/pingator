const { POST } = require('../constants');


class Router {
    routes;

    constructor() {
        this.routes = new Map();
    }

    post(url, fn) {
        const method = POST;
        const key = `${method}${url}`;

        this.routes.set(key, fn);
    }

    getHandler(key) {
        return this.routes.get(key);
    }
}

module.exports = Router;
