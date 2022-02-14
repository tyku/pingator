const { REQUEST_INTERVAL, POST } = require("./constants");
const Counter = require("./counter");
const PingReport = require("./ping-report");
const ServerStatistic = require("./server-statistic");
const { request, InternalError, ConnectionRefusedError, timerWrapper, expSleep } = require("./libs");

const pingIdCounter = new Counter();

const requestHandler = async (report) => {
  while (true) {
    ServerStatistic.total.inc();
    try {
      console.log(`Sent request to server ${JSON.stringify(report)}`);

      const result = await request("http://127.0.0.1:8080/data", {
        method: POST,
        data: JSON.stringify(report.getReport()),
      });

      console.log(`Server response: ${JSON.stringify(result)}`);

      ServerStatistic.successRequests.inc();
      return;
    } catch (e) {
      if (e instanceof InternalError) {
        ServerStatistic.failedRequests.inc();
      } else if (e instanceof ConnectionRefusedError) {
        ServerStatistic.timedRequests.inc();
        return;
      } else {
        ServerStatistic.timedRequests.inc();
      }
      await expSleep(report.attemptsCounter.inc());
    }
  }
};

const intervalId = setInterval(async () => {
  const pingId = pingIdCounter.inc();

  const responseTime = await timerWrapper(() => request("https://fundraiseup.com/"));

  const report = new PingReport(pingId, responseTime);

  await requestHandler(report);
}, REQUEST_INTERVAL);

process.on("exit", function () {
  console.log('----------------------');
  console.log(`Total requests: ${ServerStatistic.getTotal()}`);
  console.log(`Success requests: ${ServerStatistic.getSuccess()}`);
  console.log(`Failed requests: ${ServerStatistic.getFailed()}`);
  console.log(`Timed requests: ${ServerStatistic.getTimed()}`);
  console.log('----------------------');
});

process.on("SIGINT", function () {
  console.log("--------Stopping all running operations...--------");
  console.log("It can takes more than 10 sec");
  clearInterval(intervalId);
});
