const https = require('https');

async function httpsProvider(urlOptions, data) {
    const options = {
        ...urlOptions,
        port: 443,
    };

    return requestPromise(options, data);
}

const requestPromise = ((urlOptions, data) => {
    return new Promise((resolve, reject) => {
        const req = https.request(urlOptions,
            (res) => {
                let body = '';
                res.on('data', (chunk) => (body += chunk.toString()));
                res.on('error', reject);
                res.on('end', () => {
                    if (res.statusCode >= 200 && res.statusCode <= 299) {
                        resolve({ statusCode: res.statusCode, headers: res.headers, body: body });
                    } else {
                        reject('Request failed. status: ' + res.statusCode + ', body: ' + body);
                    }
                });
            });

        req.on('error', reject);
        req.end();
    });
});

module.exports = httpsProvider;
