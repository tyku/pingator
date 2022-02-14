const { E_SIGN } = require('../constants');

const expSleep = (retryCount) =>
    new Promise((resolve) => setTimeout(resolve, E_SIGN ** retryCount));

module.exports = expSleep;
