const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {
  // console.log('Devuelve todas las categorías - GET a /products/category');
  Category.findAll()
    .then((cat) => {
      res.send(cat);
    })
    .catch(next);
});

// server.get('/:nameCat', (req, res) => {
//   let { nameCat } = req.params;
//   // console.log(`Devuelve productos de la categoría - GET a /products/category/${nameCat}`);
//   if (!nameCat) return res.status(404).send('No existe la categoría');
//   Category.findAll({
//     where: {
//       taste: nameCat,
//     },
//   }).then((cat) => {
//     return res.send(cat);
//   });
// });

// ESTA ESTARÍA EN LA RUTA DE PRODUCTS
// server.get('/productsByCategory/:category', (req, res) => {
//   let { category } = req.params;
//   // console.log('Productos con la :category - GET a /products/productsByCategory/:category')
//   if (!category) return res.status(404).send('Se necesita categoría');

//   Category.findAll({
//     where: { taste: category },
//     include: { model: Product },
//   }).then((s) => {
//     res.json(s);
//   });
// });

server.get('/product/:id', (req, res, next) => {
  // Devuelve todas las categorias que tiene un producto
  // console.log(Categorías de un producto - GET a products/categoryProduct/:id)
  let { id } = req.params;

  if (!id) return res.status(404).send('No existe el producto');

  Category.findAll({
    include: { model: Product, where: { id } },
  })
    .then((cats) => {
      res.json(
        cats.map((t) => {
          return { id: t.id, taste: t.taste };
        })
      );
    })
    .catch(next);
});

server.put('/:id', (req, res) => {
  let { id } = req.params;
  // console.log('Modifico categoría - PUT a products/category/:id');
  if (!id) return res.status(400).send('La categoría no existe');

  Category.update({ taste }, { where: { id } }).then(() => {
    return res.status(200).send('Se ha modificado la categoría');
  });
});

server.delete('/:id', (req, res) => {
  let { id } = req.params;
  // console.log('Borro categoría - DELETE a products/category/:id');
  if (!id) return res.status(400).send('No existe la categoría');

  Category.destroy({
    where: {
      id,
    },
  }).then(() => {
    return res.send(200, `Categoría borrada ${id}`);
  });
});

server.post('/', (req, res) => {
  let { taste } = req.body;

  // console.log('Creo o modifico categoría - POST a /products/category/');
  if (!taste) return res.status(400).send('No se puede crear la categoría');

  Category.findOrCreate({
    where: {
      taste,
    },
    defaults: {
      taste,
    },
  }).then((category) => {
    return res.status(200).send('La categoría ha sido creada');
  });
});

module.exports = server;
