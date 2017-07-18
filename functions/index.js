/* eslint no-console:0 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Cryptowatch = require('cryptowatch');

const cw = new Cryptowatch();
const cache = {
  lastCheckTime: 0,
  prices: {},
};
const cacheTime = 30000; // 30 seconds

// enable communication with firebase db
admin.initializeApp(functions.config().firebase);

// create prices endpoint
exports.prices = functions.https.onRequest((request, response) => {
  const curTime = (new Date()).getTime();
  if (curTime - cache.lastCheckTime >= cacheTime) {
    console.log('cache skipped');

    // update the last check time
    cache.lastCheckTime = curTime;

    // fetch price info from api
    cw.prices()
    .then((res) => {
      const output = Object.assign({}, { _updated: curTime }, res);
      // cache the response
      cache.prices = output;
      response.send(output);
    })
    .catch((err) => {
      // if there's a failure, log to console and output from cache
      console.error(err);
      response.send(cache.prices);
    });
  } else {
    console.log('cache hit!');

    // send the cached value
    response.send(cache.prices);
  }
});
