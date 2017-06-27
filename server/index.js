const { resolve } = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(resolve(__dirname, 'db.json'));
const port = process.env.PORT || 3000;

server.use(jsonServer.defaults());

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
