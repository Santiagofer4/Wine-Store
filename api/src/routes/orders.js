const server = require('express').Router();

server.get('/', (req, res, next) => {
    console.log('GET a ORDERS');

    Order.findAll()
    .then((order) => {
     return res.status(200).send(order);
    })
    .catch(next);
  });


module.exports = server