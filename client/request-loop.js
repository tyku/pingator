const { REQUEST_INTERVAL } = require('./constants');
const Counter = require('./counter');
const PingReport = require('./ping-report');
const ServerStatistic = require('./server-statistic');
const request = require('./libs/async-http');
const { POST } = require('./constants');
const InternalError = require('./libs/async-http/errors/internal-error');

const sleep = (retryCount) => new Promise(resolve => setTimeout(resolve, 2.17 ** retryCount));

const requestMock = async () => request('https://fundraiseup.com/');
const requestServer = async (data) => request('http://127.0.0.1:8080/data', { method: POST, data: JSON.stringify(data.getReport()) });


const requestHandler = async (report) => {
   while(true) {
       ServerStatistic.total.inc();
       try {
           await requestServer(report);
           ServerStatistic.successRequests.inc();
           return;
       } catch (e) {
           if(e instanceof InternalError) {
                ServerStatistic.failedRequests.inc();
            } else {
               ServerStatistic.timedRequests.inc();
           }
           await sleep(report.attemptsCounter.inc());
       }
   }
};

const pingIdCounter = new Counter();

const timerWrapper = async (fn) => {
    const start = new Date().getTime();
    await fn();

    return new Date().getTime() - start;
}

const intervalId = setInterval(async () => {
    const pingId = pingIdCounter.inc();

    const responseTime = await timerWrapper(requestMock);

    const report = new PingReport(pingId, responseTime);

    await requestHandler(report);
}, REQUEST_INTERVAL);

process.on('exit', function () {
    console.log(`Total requests: ${ServerStatistic.getTotal()}`);
    console.log(`Success requests: ${ServerStatistic.getSuccess()}`);
    console.log(`Failed requests: ${ServerStatistic.getFailed()}`);
    console.log(`Timed requests: ${ServerStatistic.getTimed()}`);
});

process.on('SIGINT', function() {
    console.log('Stopping all running operations...It cant take about 10 sec');
    clearInterval(intervalId);
});


