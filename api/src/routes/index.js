const { Router } = require('express');
const { Sequelize, Op } = require('sequelize');
const { Product } = require('../db.js');
// import all routers;
const productRouter = require('./product.js');
const usersRouter = require('./users.js');
const ordersRouter = require('./orders.js');
const strainRouter = require('./strain.js');
const { extractDigitsFromString } = require('../utils/index.js');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

//Rutas
router.use('/products', productRouter);
router.use('/strain', strainRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);

// router.get('/search', (req, res) => {
//   // console.log('Ruta de search by query.');
//   let { word } = req.query;
//   let search = extractDigitsFromString(word);
//   Product.findAll({
//     where: {
//       [Op.or]: [
//         { name: { [Op.iLike]: `%${word}%` } },
//         { description: { [Op.iLike]: `%${word}%` } },
//         // { yearHarvest: { [Op.iLike]: `%${word}%` } },
//       ], //falta hacerlo case sensitive
//     },
//   })
//     .then((products) => {
//       return res.status(200).send(products);
//     })
//     .catch((err) => {
//       return console.log(err);
//     });
// });

router.get('/search', (req, res) => {
  let { word } = req.query;
  let search = extractDigitsFromString(word);
  // console.log('SEARCH', search);
  let conditions = [];
  for (const word of search.words) {
    conditions.push(
      { name: { [Op.iLike]: '%' + word + '%' } },
      { description: { [Op.iLike]: '%' + word + '%' } }
    );
  }
  for (const number of search.digits) {
    conditions.push({ yearHarvest: { [Op.eq]: number } });
  }
  // console.log('QUERY', conditions);
  Product.findAll({
    where: {
      [Op.or]: conditions,
    },
  })
    .then((result) => {
      // console.log('RESULT', result);
      return res.status(200).send(result);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
