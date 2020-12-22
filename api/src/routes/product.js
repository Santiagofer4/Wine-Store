const server = require('express').Router();
const { Product, Category } = require('../db.js');
const categoryRouter = require('./category.js');

server.use('/category', categoryRouter);

//Listado de todos los Productos

server.get('/', (req, res, next) => {
   Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

//Devuelve un producto según el ID

server.get('/:id', (req, res) => {
  let { id } = req.params;
   if (!id) return res.status(404).send('No existe el producto');
  Product.findByPk(id).then((product) => {
    return res.send(product);
  });
});

//Filtrar productos por categoría

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

//Modificar Producto

server.put('/:id', (req, res) => {
  let { id } = req.params;
  let {
    name,
    price,
    description,
    yearHarvest,
    image,
    stock,
    categories,
  } = req.body;
  let oldCategories;
  // console.log('Modifico producto - PUT a /products/:id');
  if (!id) return res.status(400).send('El producto no existe');

  Product.update(
    { name, price, description, yearHarvest, image, stock },
    { where: { id } }
  );
  Category.findAll({
    include: {
      model: Product,
      where: { id },
    },
  })
    .then((categories) => {
      oldCategories = categories;
      console.log(oldCategories);
      return Product.findByPk(id);
    })
    .then((product) => {
      oldCategories.forEach((category) => {
        product.removeCategory(category);
      });
      return product;
    })
    .then((product) => {
      categories.forEach((categoryId) => {
        Category.findByPk(categoryId).then((category) =>
          product.addCategory(category)
        );
      });
    })
    .then(() => {
      return res.status(200).send('El producto ha sido actualizado');
    });
});

//Eliminar un Producto

server.delete('/:id', (req, res) => {
  let { id } = req.params;
  // console.log('Elimino un producto - DELETE a /products/:id');
  if (!id) return res.status(400).send('No se encontró el producto a eliminar');

  Product.destroy({
    where: {
      id,
    },
  }).then(() => {
    return res.status(200).send(`Producto borrado ${id}`);
  });
});

//Borrar categoría de un producto

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

//Crear un nuevo Producto

server.post('/', (req, res, next) => {
  let prod;
  let {
    name,
    price,
    description,
    yearHarvest,
    image,
    stock,
    categories,
  } = req.body;
  // console.log('Creo nuevo producto - POST a /products');
  Product.create({
    name,
    price,
    description,
    yearHarvest,
    image,
    stock,
  })
    .then((product) => {
      categories.forEach((categoryId) => {
        Category.findByPk(categoryId).then((category) =>
          product.addCategory(category)
        );
      });
      prod = product;
    })
    .then(() => res.status(200).send(prod))
    .catch(next);
});

//Agregar categoría a un Producto

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
