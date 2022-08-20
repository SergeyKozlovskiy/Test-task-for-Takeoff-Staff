const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const isAuthorized = (req) => {
  console.log(req);
  return true;
};

server.use(middlewares);
server.use((req, res, next) => {
  console.log(req, res, next);
  if (isAuthorized(req)) {
    console.log(req, res, next);
    next(); // continue to JSON Server router
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
