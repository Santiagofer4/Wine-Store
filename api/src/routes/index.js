const { Router } = require('express');
const { Sequelize, Op } = require('sequelize');
const { Product } = require('../db.js');
// import all routers;
const productRouter = require('./product.js');
const strainRouter = require('./strain.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.use('/products', productRouter);
router.use('/strain', strainRouter);

router.get('/search', (req, res) => {
  console.log('Ruta de search by query.');
  let { word } = req.query;

  Product.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${word}%` } },
        { description: { [Op.like]: `%${word}%` } },
      ], //falta hacerlo case sensitive
    },
  })
    .then((products) => {
      return res.status(200).send(products);
    })
    .catch((err) => {
      return console.log(err);
    });
});

module.exports = router;
