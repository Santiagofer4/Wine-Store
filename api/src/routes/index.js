const { Router } = require("express");
const { Sequelize } = require('sequelize');
const { Product } = require("../db.js");
// import all routers;
const productRouter = require("./product.js");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.use("/products", productRouter);

router.get("/search", (req, res) => {
  console.log("Ruta de search by query");

  Product.findOne({
    where: {
        description: {
        [Sequelize.Op.iLike]: `%${req.query.word}%`,
      },
    },
  }).then((products) => {
    return res.status(200).send(products);
  }).catch(err => {
      return console.log(err)
  })
});

module.exports = router;
