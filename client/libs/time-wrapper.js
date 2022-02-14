const timerWrapper = async (fn) => {
    const start = new Date().getTime();
    await fn();

    return new Date().getTime() - start;
};

module.exports = timerWrapper;
