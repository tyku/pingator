const { URL } = require("url");

const TIMEOUT = 10000;

const httpProvider = require("./httpProvider");
const httpsProvider = require("./httpsProvider");

async function request(url, options = {}) {
  const { data } = options;

  const { protocol, hostname, pathname, search, port } = parseUrl(url);
  const request = getClient(protocol);

  const urlOptions = {
    ...options,
    path: `${pathname}${search}`,
    hostname,
    timeout: TIMEOUT,
    port,
  };

  return request(urlOptions, data);
}

function parseUrl(url) {
  const parsedUrl = new URL(url);

  return parsedUrl;
}

function getClient(protocol) {
  const schema = protocol.replace(":", "");

  switch (schema) {
    case "http":
      return httpProvider;
    case "https":
      return httpsProvider;
    default:
      throw new Error(`Undefined schema: ${schema}`);
  }
}

module.exports = request;
