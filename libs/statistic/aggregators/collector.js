const StatisticStorage = require('../storage');

const INITIAL_VALUE = [];

class Collector {
    storage = StatisticStorage;

    name

    constructor(name) {
        this.name = name;
    }

    add(data) {
        const { storage, name } = this;

        let value = storage.get(name);

        if (!value) {
            value = INITIAL_VALUE;
        }

        value.push(data);

        storage.set(name, value);
    }

    getAll() {
        const { storage, name } = this;

        return storage.get(name);
    }
}

module.exports = Collector;
