const server = require("express").Router();
const { User, Order, OrderLine } = require("../db.js");

//Obtener la orden CARRITO (CART)

server.post("/", (req, res) => {
  let { id } = req.params;
  console.log("ID", id);
  let { productId, quantity, price } = req.body;

  if (!productId || id)
    return res.status(400).send("No se puede agregar el producto al carrito");

  Order.findAll({
    where: { userId: id, status: "cart" },
  }).then((order) => {
    OrderLine.findOrCreate({
      where: {
        productId: id,
      },
      defaults: {
        productId,
        quantity,
        price,
        orderId: order.id,
      },
    }).then((result) => {
      console.log("RESULT", result);
      const [instance, wasCreated] = result;
    });
  });
  //con esta orden ir a buscar el orderId
  res.status(200).send("Entré a agregar item al carrito");
});

module.exports = server;

//   models.sequelize.transaction(function(t) {
//     return models.users.findOrCreate({
//       where: {
//         userId:    profile.userId,
//         name:      profile.name
//       },
//       transaction: t
//     })
//     .spread(function(userResult, created){
//       // userResult is the user instance

//       if (created) {
//         // created will be true if a new user was created
//       }
//     });
//   });

//   if (!idProduct || Category)
//   return res.status(400).send('No se puede agregar la categoría');

// Product.findByPk(idProduct).then((product) => {
//   product.addCategory(Category);
//   return res.send('Se agregó la categoría');
// });