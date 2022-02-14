class Counter {
    counter = 0;

    inc() {
        ++this.counter;

        return this.counter;
    }

    get() {
        const { counter } = this;

        return counter;
    }
}

module.exports = Counter;
