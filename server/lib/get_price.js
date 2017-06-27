const Cryptowatch = require('cryptowatch');

const cw = new Cryptowatch();

module.exports = (data) => {
  if (!data.cointype || !data.count) return data;

  return cw.price(data.cointype, 'usd', 'poloniex')
  .then(({ price }) => Object.assign({
    price,
    value: price * data.count,
  }, data));
};
