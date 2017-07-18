import axios from 'axios';

const client = axios.create({
  baseURL: 'https://us-central1-coinval-e60f1.cloudfunctions.net',
  timeout: 5000,
});

export default function (currency = 'usd', exchange = 'poloniex') {
  return client.get('/prices')
  .then(res => res.data)
  .then(data => ({
    btc: data[`${exchange}:btc${currency}`],
    ltc: data[`${exchange}:ltc${currency}`],
    eth: data[`${exchange}:eth${currency}`],
    xmr: data[`${exchange}:xmr${currency}`],
    dash: data[`${exchange}:dash${currency}`],
    xrp: data[`${exchange}:xrp${currency}`],
    _updated: data['_updated'], // eslint-disable-line dot-notation
  }));
}
