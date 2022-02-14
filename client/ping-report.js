const Counter = require('./counter');

class PingReport {
    pingId;

    attemptsCounter;

    date;

    responseTime;

    constructor(pingId, responseTime) {
        this.pingId = pingId;
        this.attemptsCounter = new Counter();
        this.date = Date.now();
        this.responseTime = responseTime;
    }

    attemptsInc() {
        this.attemptsCounter.inc();
    }

    getReport() {
        return {
            pingId: this.pingId,
            deliveryAttempt: this.attemptsCounter.get(),
            date: this.date,
            responseTime: this.responseTime,
        };
    }
}

module.exports = PingReport;
