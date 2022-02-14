const StatisticStorage = require("../storage");

const INITIAL_VALUE = 0;
const INCREMENT_STEP = 1;

class Counter {
  storage = StatisticStorage;

  name;

  constructor(name) {
    this.name = name;
  }

  inc() {
    const { storage, name } = this;

    let value = storage.get(name);

    if (!value) {
      value = INITIAL_VALUE;
    }

    storage.set(name, value + INCREMENT_STEP);
  }

  getSize() {
    const { storage, name } = this;

    return storage.get(name);
  }
}

module.exports = Counter;
