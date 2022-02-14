const http = require("http");
const { InternalError, ConnectionRefusedError } = require("../errors");

async function httpProvider(urlOptions, data) {
  const options = {
    port: 80,
    ...urlOptions,
    headers: {
      "Content-Type": "application/json",
    },
    bodyUsed: true,
  };

  return requestPromise(options, data);
}

const requestPromise = (urlOptions, data) => {
  return new Promise((resolve, reject) => {
    const req = http.request(urlOptions, (res) => {
      if (res.statusCode >= 500 && res.statusCode < 513) {
        return reject(new InternalError());
      } else if (res.statusCode < 200 || res.statusCode > 299) {
        return reject(new Error(`HTTP status code ${res.statusCode}`));
      }

      const body = [];
      res.on("data", (chunk) => body.push(chunk));
      res.on("end", () => {
        const resString = Buffer.concat(body).toString();
        resolve(resString);
      });
    });

    req.on("error", (err) => {

      if(err && err.code === 'ECONNREFUSED') {
        return reject(new ConnectionRefusedError());
      }

      return reject();
    });
    req.write(data);
    req.end();
  });
};

module.exports = httpProvider;
