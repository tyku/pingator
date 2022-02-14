const { Collector } = require('../libs/statistic/aggregators');

class SiteStatistic {
    requests;

    constructor() {
        this.requests = new Collector('site_requests');
    }

    addRequest(data) {
        this.requests.add(data);
    }

    getMedian() {
        const { requests } = this;

        const values = requests.getAll();

        if (!values || !values.length) {
            return 0;
        }

        const sorted = values.sort((a,b) => parseFloat(a) - parseFloat(b));
        const medianIndex = Math.floor(sorted.length / 2);

        return sorted[medianIndex]
    }

    getAverage() {
        const { requests } = this;
        const values = requests.getAll();

        if (!values || !values.length) {
            return 0;
        }

        const sum = values.reduce((acc, value) => {
            acc += parseFloat(value);

            return acc;
        }, 0);

        return sum / values.length;
    }
}

module.exports = new SiteStatistic();
