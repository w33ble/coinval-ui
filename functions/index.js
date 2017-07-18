/* eslint no-console:0 */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Cryptowatch = require('cryptowatch');

const cw = new Cryptowatch();
const cache = {
  lastCheckTime: 0,
  prices: {},
};

// enable communication with firebase db
admin.initializeApp(functions.config().firebase);

// create prices endpoint
exports.prices = functions.https.onRequest((request, response) => {
  const curTime = (new Date()).getTime();
  if (curTime - cache.lastCheckTime >= 30000) {
    console.log('cache skipped');

    // update the last check time
    cache.lastCheckTime = curTime;

    // fetch price info from api
    cw.prices().then((res) => {
      // cache the response
      cache.prices = res;
      response.send(res);
    });
  } else {
    console.log('cache hit!');

    // send the cached value
    response.send(cache.prices);
  }
});
