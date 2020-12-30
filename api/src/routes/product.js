const server = require('express').Router();
const { Sequelize } = require('sequelize');
const { Product, Category, Strain } = require('../db.js');
// const { Sequelize } = require('sequelize');
const categoryRouter = require('./category.js');

// [FLAVIO] SIEMPRE RETORNAR UN STATUS DE CUALQUIER METODO QUE SE LE HACE A LA API:
// PUEDE SER DE 3 maneras (desconozco si habra otra manera de hacerlo):
// 1. return res.status(XXX).send(`CON O SIN CONTENIDO)
// 2. return res.send(xxx,`CON O SON CONTENIDO`)
// 3. return res.sendStatus(XXX)
// Cualquiera de las formas es correcta, pero, res.status(XXX) NO DEVUELVE NADA -- OJO -- cambié el color del comentario por la demo

server.use('/category', categoryRouter);

server.get('/', (req, res, next) => {
  //  console.log('Traigo todos los productos - GET a /products');
  Product.findAll().then((products) => {
    res.send(products);
  });
});

server.get('/:id', (req, res) => {
  let { id } = req.params;
  // console.log('Filtro productos por id - GET a /products/:id');
  if (!id) return res.status(404).send('No existe el producto');
  Product.findByPk(id).then((product) => {
    return res.status(200).send(product);
  });
});

server.get('/productsByCategory/:category', (req, res) => {
  let { category } = req.params;
  // console.log('Productos con la :category - GET a /products/productsByCategory/:category')
  if (!category) return res.status(404).send('Se necesita categoría');

  Category.findAll({
    where: { taste: category },
    include: { model: Product },
  }).then((s) => {
    res.json(s);
  });
});

server.put('/:id', async (req, res) => {
  let { id } = req.params;
  let {
    name,
    price,
    description,
    yearHarvest,
    image,
    stock,
    categories,
    strain,
  } = req.body;
  if (!id) return res.status(400).send('El producto no existe');
  try {
    const wineToUpdate = await Product.findByPk(id);
    const updatedWine = await wineToUpdate.update(
      {
        name,
        price,
        description,
        yearHarvest,
        image,
        stock,
        strainId: strain,
      },
      {
        returning: true,
        plain: true,
      }
    );

    if (categories && categories.length > 0) {
      await updatedWine.setCategories([...categories]);
    }
    return res.status(200).send(updatedWine);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }

  // let oldCategories;
  // Product.update(
  //   { name, price, description, yearHarvest, image, stock, strainId: strain },
  //   { where: { id } }
  // );
  // Category.findAll({
  //   include: {
  //     model: Product,
  //     where: { id },
  //   },
  // })
  //   .then((categories) => {
  //     oldCategories = categories;
  //     // console.log(oldCategories);
  //     return Product.findByPk(id);
  //   })
  //   .then((product) => {
  //     oldCategories.forEach((category) => {
  //       product.removeCategory(category);
  //     });
  //     return product;
  //   })
  //   .then((product) => {
  //     categories.forEach((categoryId) => {
  //       Category.findByPk(categoryId).then((category) =>
  //         product.addCategory(category)
  //       );
  //     });
  //   })
  //   .then(() => {
  //     return res.status(200).send('El producto ha sido actualizado');
  //   });
});

server.delete('/:id', async (req, res) => {
  let { id } = req.params;
  let wine;
  let categories;
  // console.log('Elimino un producto - DELETE a /products/:id');
  if (!id) return res.status(400).send('No se recibio ID');
  try {
    wine = await Product.findOne({ where: { id } });
    categories = await Category.findAll({
      include: { model: Product, where: { id } },
    });
    const payload = {
      wine,
      categories,
    };
    await wine.destroy();
    return res.status(200).send(payload);
  } catch (error) {
    console.error(error);
    return res.status(500).send('No se pudo borrar el producto');
  }
  // Product.destroy({
  //   where: {
  //     id,
  //   },
  // }).then(() => {
  //   return res.status(200).send(`Producto borrado ${id}`);
  // });
});

server.delete('/:idProduct/category/:idCategory', (req, res) => {
  const { idProduct, idCategory } = req.params;
  // console.log('Borro categoría de producto - DELETE a /products/:idProduct/category/:idCategory')
  if (!idProduct || idCategory)
    return res.status(400).send('No existe el producto o la categoría');

  Product.findOne({
    where: { id: idProduct },
  })
    .then((prod) => {
      prod.removeCategory([idCategory]);
      res.sendStatus(200);
    })
    .catch((e) => console.log(e));
});

server.post('/', async (req, res, next) => {
  let {
    name,
    price,
    description,
    yearHarvest,
    image,
    stock,
    categories,
    strain,
  } = req.body;

  try {
    let product = await Product.create({
      name,
      price,
      description,
      yearHarvest,
      image,
      stock,
      strainId: strain,
    });
    await categories.forEach((categoryId) => {
      Category.findByPk(categoryId).then((category) =>
        product.addCategory(category)
      );
    });
    return res.status(200).send(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

server.post('/:idProduct/category', (req, res) => {
  let { idProduct } = req.params;
  let { Category } = req.body;

  if (!idProduct || Category)
    return res.status(400).send('No se puede agregar la categoría');

  Product.findByPk(idProduct).then((product) => {
    product.addCategory(Category);
    return res.send('Se agregó la categoría');
  });
});

module.exports = server;
