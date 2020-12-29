const server = require("express").Router();
const { Order, OrderLine, Product } = require("../db.js");

// Devuelve todas las ordenes

server.get("/", (req, res, next) => {
  const { status } = req.query;

  if (!status) {
    Order.findAll({
      include: { model: OrderLine, include: [{ model: Product }] },
    })
      .then((order) => {
        return res.status(200).send(order);
      })
      .catch(next);
  } else {
    Order.findAll({
      where: { status },
      include: { model: OrderLine, include: [{ model: Product }] },
    })
      .then((list) => {
        res.json(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//Ruta que retorna una orden en particular

server.get("/:id", (req, res) => {
  const { id } = req.params;

  if(!id) return res.status(400).send('No existe la orden seleccionada')

  Order.findAll({
    where: {
      id,
    },
  }).then((order) => {
    res.send(order);
  });
});


//Ruta que retorna el total de una orden en particular

server.get("/total/:id", (req, res) => {
  const { id } = req.params;
  if(!id) return res.status(400).send('No existe la orden seleccionada')
  
  OrderLine.findAll({
    where: {
      orderId : id,
    },
  }).then((orderLine) => {
    var sumaTotal = 0;
    
       
          orderLine.forEach((t) => {
        
          sumaTotal += parseInt(t.quantity) * parseInt(t.price);
         
          console.log('Suma Total', sumaTotal)
        }) 
        sumaTotal = Math.ceil(sumaTotal * 1.21)
        return res.status(200).json(sumaTotal);
        
    })

    
  });

//Ruta para crear una orden

server.post("/", (req, res) => {
  const { status, total, userId } = req.body;

  Order.findOrCreate({
    where: { status: "cart", userId: userId },
    defaults: { status, total },
  })
    .then((order) => {
      const [instance, wasCreated] = order;
      if (!wasCreated) {
        return res.send("el usuario ya tiene un carrito");
      }
      instance.setUser(userId);
      return res.send("se agrego una nueva orden");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Ruta para modificar una orden

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const { total, status } = req.body;

  Order.update({ status, total }, { where: { id } })
    .then(() => {
      res.status(201).send("orden actualizada");
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

module.exports = server;
