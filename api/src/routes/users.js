const server = require('express').Router();
const { User, Order, Product, OrderLine } = require('../db.js');
//const cartRouter = require('./cart.js');

//server.use('/:id/cart', cartRouter);

// Listar todos los USERS

server.get('/', (req, res, next) => {
  console.log('GET a USERS');

  User.findAll()
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch(next);
});

//Agregar un USER

server.post('/', (req, res, next) => {
  let { firstName, lastName, email, birthdate, cellphone, role, password } = req.body;

  console.log('Creo o modifico USER');

  if (!email) return res.status(400);

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
      role,
      password
    },
  }).then((user) => {
    return res.status(200).send(`El usuario ha sido creado`);
  })
    .catch((err) => {
      return console.log(err)
    })

});

//Editar un USER by ID

server.put('/:id', (req, res) => {
  let { id } = req.params;
  let { firstName, lastName, email, birthdate, cellphone, role, password } = req.body;
  let oldInfo;

  console.log('modifico USER');
  if (!id) return res.status(400).send('El usuario no existe');

  User.findByPk(id).then(User.update({ firstName, lastName, email, birthdate, cellphone, role, password }, { where: { id } })
  ).then(() => {
    return res.status(200).send('Se ha modificado el usuario');
  });

})

//Borrar un USER by ID

server.delete('/:id', (req, res) => {
  let { id } = req.params;

  console.log('voy a eliminar un usuario');

  if (!id) return res.status(400).send('No se encontró el usuario a eliminar');

  User.destroy({
    where: {
      id,
    },
  }).then(() => {
    console.log('destroy OK');
    return res.status(200).send(`Usuario ${id} borrado`);
  });

});

server.get('/:id/orders', (req, res) => {
  const { id } = req.params;
  Order.findAll({
    where: { userId: id }
  })
    .then((list) => {
      res.json(list)
    })
    .catch(err => {
      console.log(err)
    })
})

server.get('/:id/cart', (req, res) => {
  let { id } = req.params
//  console.log('GET a CART');
   Order.findAll({
     include:[OrderLine],
    where: { status: 'cart',
    userId: id}
  })
  .then(ord => {
    return res.status(200).send(ord)
   })
});

server.post('/:id/cart', (req, res) => {
  let { id } = req.params;
  let { productId, quantity, price } = req.body

  if (!productId || !id)
    return res.status(400).send('No se puede agregar el producto al carrito');

  Order.findOrCreate({
    where: {
      userId: id,
      status: "cart",
    }, defaults: {
      total: 0,
      status: "cart",
    }
  })
    .then(order => {
      const [instance, wasCreated] = order; // si crea el dato wasCreated = true sino false
      OrderLine.create({
        productId,
        quantity,
        price,
      })
        .then(orderLine => {
          orderLine.setProduct(productId);
          orderLine.setOrder(instance.id)
          console.log('exito', productId)
        })
    })
  res.status(200).send("Entré a agregar item al carrito");

})



module.exports = server