const request = require('./libs/async-http');

request('https://the-one-api.dev/v2/book?api_key=MY_KEY')
    .then(console.log)
    .catch(console.log);
