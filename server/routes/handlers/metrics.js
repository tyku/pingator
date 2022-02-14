const Route = require("../router");
const { OK, ERROR } = require("../../constants");
const statistic = require("../../site-statistic");

const metrics = new Route();

metrics.post("/data", (req, res) => {
  const { body } = req;
  const randomRate = Math.random();

  if (randomRate <= 0.6) {
    const { responseTime } = body;

    statistic.addRequest(responseTime);

    console.log(`Data retrieved: ${JSON.stringify(body)}`);

    res.writeHead(OK).end("OK");
  } else if (randomRate > 0.6 && randomRate < 0.8) {
    res.writeHead(ERROR).end();
  }
});

module.exports = metrics;
