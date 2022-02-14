const http = require('http');

const statistic = require('./site-statistic');
const { PORT, HOST } = require('./constants');
const findRote = require('./routes');
const { bodyParserMiddleware } = require('./middlewares');


const requestListener = function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    const { method, url } = req;

    findRote(method, url, bodyParserMiddleware)(req, res);

};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

server.on('connection', function (socket) {
    socket.setTimeout(  10000);
});

server.on('close', function() {
    console.log(`Average time: ${statistic.getAverage()}`);
    console.log(`Median time: ${statistic.getMedian()}`);
});

process.on('SIGINT', function() {
    console.log('Stopping ... it cat take about 10 sec');
    server.close();
});
