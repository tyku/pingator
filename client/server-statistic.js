const { Counter } = require('../libs/statistic/aggregators');

class ServerStatistic {
    total;

    successRequests;

    failedRequests;

    timedRequests;

    constructor() {
        this.total = new Counter('total_requests');
        this.successRequests = new Counter('success_requests');
        this.failedRequests = new Counter('failed_requests');
        this.timedRequests = new Counter('timed_requests');
    }

    getTotal() {
        const { total } = this;

        return total.getSize();
    }

    getSuccess() {
        const { successRequests } = this;

        return successRequests.getSize();
    }

    getFailed() {
        const { failedRequests } = this;

        return failedRequests.getSize();
    }

    getTimed() {
        const { timedRequests } = this;

        return timedRequests.getSize();
    }
}

module.exports = new ServerStatistic();
