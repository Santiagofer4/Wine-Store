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
    const wineToUpdate = await Product.findByPk(id); //? Instanciamos el producto a ser modificado

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
    //* Actualizamos la instrancia y lo guardamos en un objeto

    //* Si recibimos categorias las `seteamos` (pisamos los valores anteriores)
    if (categories && categories.length > 0) {
      categories = categories.filter((c) => c !== '');
      await updatedWine.setCategories([...categories]);
    }
    return res.status(200).send(updatedWine); //* Devuelve objeto actualizado
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

server.delete('/:id', async (req, res) => {
  let { id } = req.params;
  let wine;
  let categories;
  // console.log('Elimino un producto - DELETE a /products/:id');
  if (!id) return res.status(400).send('No se recibio ID');
  try {
    //* Instanciamos el prod a borrar y las categorias correspondientes a ese prod
    wine = await Product.findOne({ where: { id } });
    categories = await Category.findAll({
      include: { model: Product, where: { id } },
    });
    const payload = {
      wine,
      categories,
    };
    await wine.destroy();
    return res.status(200).send(payload); //? devolvemos el producto borrado con sus categorias correspondientes
  } catch (error) {
    console.error(error);
    return res.status(500).send('No se pudo borrar el producto');
  }
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
    //* Instanciamos el producto a crear
    let product = await Product.create({
      name,
      price,
      description,
      yearHarvest,
      image,
      stock,
      strainId: strain,
    });
    //* loopeamos por las categorias recibidas y las asignamos
    await categories.forEach((categoryId) => {
      Category.findByPk(categoryId).then((category) =>
        product.addCategory(category)
      );
    });
    return res.status(200).send(product); //? devuelve el producto creado
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
