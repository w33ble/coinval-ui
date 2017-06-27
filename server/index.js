const { resolve } = require('path');
const jsonServer = require('json-server');
const getPrice = require('./lib/get_price');

const server = jsonServer.create();
const router = jsonServer.router(resolve(__dirname, 'db.json'));
const port = process.env.PORT || 3000;

server.use(jsonServer.defaults());

router.render = (req, res) => {
  const isArray = Array.isArray(res.locals.data);
  const records = isArray ? res.locals.data : [res.locals.data];

  Promise.all(records.map(getPrice))
  .then(data => (isArray ? data : data[0]))
  .then((data) => {
    res.jsonp(data);
  });
};

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
