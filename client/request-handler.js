const { POST } = require("./constants");
const ServerStatistic = require("./server-statistic");
const { request, expSleep, InternalError } = require("./libs");

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
            } else {
                ServerStatistic.timedRequests.inc();
            }
            await expSleep(report.attemptsCounter.inc());
        }
    }
};

module.exports = requestHandler;
