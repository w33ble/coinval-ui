const functions = require('firebase-functions');
const admin = require('firebase-admin');
const Cryptowatch = require('cryptowatch');

// enable communication with firebase db
admin.initializeApp(functions.config().firebase);
const cw = new Cryptowatch();

// create prices endpoint
exports.prices = functions.https.onRequest((request, response) => {
  cw.prices().then(res => response.send(res));
});
