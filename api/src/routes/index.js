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

router.get('/search', (req, res) => {
  let { word } = req.query;
  let search = extractDigitsFromString(word); //func para extraer numeros de string de busqueda
  // console.log('SEARCH', search);
  let conditions = [];

  //* Si `search.words` pusheamos al array de condiciones de busqueda (name & description)
  if (search.words && search.words.length > 0) {
    for (const word of search.words) {
      conditions.push(
        { name: { [Op.iLike]: '%' + word + '%' } },
        { description: { [Op.iLike]: '%' + word + '%' } }
      );
    }
  }

  //* Si `search.digits` pusheamos al array de condiciones de busqueda (yearHarvest)
  if (search.digits && search.digits.length > 0) {
    for (const number of search.digits) {
      conditions.push({ yearHarvest: { [Op.eq]: number } });
    }
  }

  Product.findAll({
    where: {
      [Op.or]: conditions,
    },
  })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => console.error(err));
});

module.exports = router;