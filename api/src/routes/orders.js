const server = require('express').Router();
const {Order,User, OrderLine, Product} = require('../db.js');


server.get('/', (req, res, next) => {
  // debe devolver todas las ordenes si no recibe status

  const {status} = req.query;
    console.log('GET a ORDERS');
    if(!status){
      Order.findAll({
        include: { model: OrderLine, include: [{ model: Product }] },
      })
      .then((order) => {
       return res.status(200).send(order);
      })
      .catch(next);
    }else{
      Order.findAll({
        where:{ status},
        include: { model: OrderLine, include: [{ model: Product }] },

      })
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
    Order.findOrCreate({
      where: {status: "cart", userId: userId},
      defaults: { status, total},
    })
    .then((order)=>{ 
      const [instance, wasCreated] = order;
      if(!wasCreated){
        return res.send("el usuario ya tiene un carrito");
      }
      instance.setUser(userId);
      return res.send('se agrego una nueva orden');
    })
    .catch((err)=>{console.log(err)})
  })

  server.get('/:id',(req,res)=>{
      Order.findAll({
        where:{
            id : req.params.id
        }
      })
      .then((order)=>{
        res.send(order)
      })

  })

  server.put('/:id',(req,res)=>{
    const {id}= req.params;
    const {total, status} = req.body;
    Order.update({ status,total }, {where:{id}})
    .then((respuesta)=>{
      res.status(201).send('orden actualizada')
    })
    .catch(err=>{
      console.log(err)
      res.status(400)
    })
  })



module.exports = server