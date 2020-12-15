const server = require('express').Router();
const {Order,User} = require('../db.js');
server.get('/', (req, res, next) => {
  // debe devolver todas las ordenes si no recibe status

  const {status} = req.query;
    console.log('GET a ORDERS');
    if(!status){
      Order.findAll()
      .then((order) => {
       return res.status(200).send(order);
      })
      .catch(next);
    }else{
      Order.findAll({where:{ status}})
      .then((list)=>{
        console.log('respuesta')
        res.json(list)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  });

  server.post('/',(req,res)=>{
    const{status,total,userId,}=req.body;
    Order.create({
      status,
      total,
    })
    .then((order)=>{     
      return order.setUser(userId)
    })
    .then(() =>{
      res.send('se agrego una nueva orden')

    })
  })



module.exports = server