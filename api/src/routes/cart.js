const server = require('express').Router();
const { User, Order } = require('../db.js');

//El Carrito va a ser una orden con un status CART ??

//Obtener la orden CARRITO (CART)

server.get('/', (req, res) => {
    console.log('GET a CART');
   // res.status(200).send("Entré al carrito");
     Order.findAll({
         where: {status: 'cart'}
     }).then(order => {
        return res.status(200).send(order)
        //! Falta hacer que devuelva TODOS los productos de la orden
     })
 
  });

  server.post('/', (req, res) => {
    res.status(200).send("Entré a agregar item al carrito");
    
  })

  module.exports = server;