const http = require("http");
const InternalError = require("./errors/internal-error");

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

    req.on("error", reject);
    req.write(data);
    req.end();
  });
};

module.exports = httpProvider;
