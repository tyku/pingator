class StatisticStorage {
    storage = new Map();

    get(label) {
        const { storage } = this;

        return storage.get(label);
    }

    set(label, data) {
        const { storage } = this;

        storage.set(label, data);
    }

}

module.exports = new StatisticStorage();
