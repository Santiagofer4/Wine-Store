const server = require('express').Router();
const { User, Order, Product, OrderLine } = require('../db.js');
//const cartRouter = require('./cart.js');

//server.use('/:id/cart', cartRouter);

//Borrar un USER by ID

server.delete('/:id', (req, res) => {
  let { id } = req.params;

  if (!id) return res.status(400).send('No se encontró el usuario a eliminar');

  User.destroy({
    where: {
      id,
    },
  }).then(() => {
    return res.status(200).send(`Usuario ${id} borrado`);
  });
});

//Vaciar carrito

server.delete('/:userId/cart', async (req, res) => {
  let { userId } = req.params;

  if (!userId) return res.send(400, 'No hay carrito asociado al usuario');

  try {
    let cartFromUser = await Order.findOne({
      where: {
        status: 'cart',
        userId: userId,
      },
    });
    if (cartFromUser.dataValues && cartFromUser.dataValues.id) {
      let deletedOrderLines = await OrderLine.destroy({
        where: {
          orderId: cartFromUser.dataValues.id,
        },
      });
      return res.status(200).send(String(deletedOrderLines));
    } else {
      return res.status(400).send('el usuario no tiene carrito');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }

  // Order.findOne({
  //   where: {
  //     status: 'cart',
  //     userId: userId,
  //   },
  // }).then((orders) => {
  //   let id = orders.id;
  //   OrderLine.destroy({
  //     where: {
  //       orderId: id,
  //     },
  //   }).then(() => {
  //     return res.send(200, 'El carrito del usuario se ha borrado');
  //   });
  // });
});

// Borrar producto del carrito

server.delete('/:idUser/cart/:productId', (req, res) => {
  let { idUser, productId } = req.params;

  if (!idUser) return res.send(400, 'No hay carrito asociado al usuario');

  Order.findOne({
    where: {
      status: 'cart',
      userId: idUser,
    },
  }).then((orders) => {
    let id = orders.id;
    OrderLine.destroy({
      where: {
        orderId: id,
        productId,
      },
    }).then(() => {
      return res.status(200).send('El producto ha sido eliminado del carrito');
    });
  });
});

// Listar todos los USERS

server.get('/', (req, res, next) => {
  User.findAll()
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
});

// Ruta que retorna todos los items del carrito - GET a /users/:id/cart

server.get('/:id/cart', (req, res) => {
  let { id } = req.params;
  Order.findAll({
    where: { status: 'cart', userId: id },
    include: { model: OrderLine, include: [{ model: Product }] },
  }).then((ord) => {
    return res.status(200).send(ord);
  });
});

// Ruta que retorna todas las ordenes de un usuario

server.get('/:id/orders', (req, res) => {
  const { id } = req.params;
  id = id * 1;
  Order.findAll({
    where: { userId: id },
  })
    .then((list) => {
      res.json(list);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Agregar un USER

server.post('/', (req, res, next) => {
  let { firstName, lastName, email, birthdate, cellphone, password } = req.body;

  if (!email) return res.status(400).send('Debe ingresar un email');

  User.findOrCreate({
    where: {
      email,
    },
    defaults: {
      firstName,
      lastName,
      email,
      birthdate,
      cellphone,
      isAdmin: false,
      password,
    },
  })
    .then((user) => {
      const [instance, wasCreated] = user;
      if (wasCreated) {
        return res.status(200).send(`El usuario ha sido creado`);
      } else {
        return res.status(200).send(`El usuario ya existe`);
      }
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
});

// Agregar elemento al carrito

server.post('/:userId/cart', async (req, res) => {
  let { userId } = req.params;
  let { id, price, quantity, increment } = req.body;
  // console.log('BODY', req.body);
  // console.log('USER ID', userId);

  if (!id || !userId)
    return res.status(400).send('Id de usuario o producto faltante');

  try {
    const [newOrder, newOrderCreated] = await Order.findOrCreate({
      where: {
        userId,
        status: 'cart',
      },
      defaults: {
        total: 0,
        status: 'cart',
      },
    });

    const [newOrderLine, newOrderLineCreated] = await OrderLine.findOrCreate({
      where: {
        productId: id,
      },
      defaults: {
        productId: id,
        quantity: increment ? quantity++ : quantity--,
        price,
      },
    });

    if (!newOrderLineCreated) {
      await newOrderLine.update({ quantity }, { where: { productId: id } });
    }

    await newOrderLine.setProduct(id);
    await newOrderLine.setOrder(newOrder.dataValues.id);

    return res.status(200).send({ newOrder, newOrderLine });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }

  // let instacia;
  // Order.findOrCreate({
  //   where: {
  //     userId,
  //     status: 'cart',
  //   },
  //   defaults: {
  //     total: 0,
  //     status: 'cart',
  //   },
  // }).then((order) => {
  //   const [instance, wasCreated] = order; // si crea el dato wasCreated = true sino false
  //   instacia = instance;
  //   orderLine = OrderLine.findOrCreate({
  //     where: {
  //       productId: id,
  //     },
  //     defaults: {
  //       productId: id,
  //       quantity,
  //       price,
  //     },
  //   }).then((orderLine) => {
  //     const [instance, wasCreated] = orderLine;
  //     if (!wasCreated) {
  //       OrderLine.update({ quantity }, { where: { productId: id } });
  //     }
  //     instance.setProduct(id);
  //     instance.setOrder(instacia.id);
  //   });
  // });
  // res.status(200).send('Entré a agregar item al carrito');
});

//Editar un USER by ID

server.put('/:id', (req, res) => {
  let { id } = req.params;
  let { firstName, lastName, email, birthdate, cellphone, password } = req.body;

  if (!id) return res.status(400).send('El usuario no existe');

  User.findByPk(id)
    .then(
      User.update(
        { firstName, lastName, email, birthdate, cellphone, password },
        { where: { id } }
      )
    )
    .then(() => {
      return res.status(200).send('Se ha modificado el usuario');
    });
});

//Editar cantidades de producto

server.put('/:idUser/cart', (req, res) => {
  let { idUser } = req.params;
  idUser = idUser * 1;
  let { productId, quantity } = req.body;

  if (!idUser) return res.status(400).send('El usuario no existe');

  Order.findOne({
    where: {
      status: 'cart',
      userId: idUser,
    },
  })
    .then((orders) => {
      let id = orders.id;
      OrderLine.update(
        { quantity },
        { where: { productId: productId, orderId: id } }
      );
    })
    .then(() => {
      return res.send(200, 'El carrito del usuario se ha actualizado');
    });
});

module.exports = server;
