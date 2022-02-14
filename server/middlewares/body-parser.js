const bodyParserMiddleware = (req, res, fn) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        req.body = JSON.parse(data);

        return fn(req, res);
    })

}

module.exports = bodyParserMiddleware;
