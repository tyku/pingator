const httpMethods = require("./http-methods");
const E_SIGN = 2.17;
const REQUEST_INTERVAL = 1000;

module.exports = {
  E_SIGN,
  REQUEST_INTERVAL,
  ...httpMethods,
};
