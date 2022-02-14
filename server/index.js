const http = require("http");

const statistic = require("./site-statistic");
const { PORT, HOST, TIMEOUT } = require("./constants");
const findRote = require("./routes");
const { bodyParserMiddleware } = require("./middlewares");

const requestListener = function (req, res) {
  res.setHeader("Content-Type", "application/json");

  const { method, url } = req;

  findRote(method, url, bodyParserMiddleware)(req, res);
};

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});

server.on("connection", function (socket) {
  socket.setTimeout(TIMEOUT);
});

server.on("close", function () {

  console.log('----------------------');
  console.log(`Average time: ${statistic.getAverage()} ms`);
  console.log(`Median time: ${statistic.getMedian()} ms`);
  console.log('----------------------');
});

process.on("SIGINT", function () {
  console.log("Stopping ... it cat takes more than 10 sec");
  server.close();
});
