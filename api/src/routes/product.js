const server = require('express').Router();
const { Product, Category, User, Strain } = require('../db.js');
const { Sequelize } = require('sequelize');

server.get('/', (req, res, next) => {
  console.log('GET a productos');
  Product.findAll()
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

server.get('/category', (req, res, next) => {
  console.log('GET a categorys');
  Category.findAll()
    .then((cat) => {
      res.send(cat);
    })
    .catch(next);
});

server.get('/strain', (req, res, next) => {
  console.log('GET a strains');
  Strain.findAll()
    .then((strain) => {
      res.json(strain); //? json no me envia la data???
    })
    .catch(next);
});

server.get('/category/:nameCat', (req, res) => {
  let { nameCat } = req.params;

  console.log('entré a filtro por categoría');

  if (nameCat) {
    Category.findAll({
      where: {
        taste: nameCat,
      },
    }).then((cat) => {
      return res.send(cat);
    });
  } else {
    return res.status(404).send('No existe la categoría');
  }
});

server.get('/:id', (req, res) => {
  let { id } = req.params;

  console.log('entré a filtro por id');

  if (id) {
    Product.findByPk(id).then((product) => {
      return res.send(product);
    });
  } else {
    return res.status(404).send('No existe el producto');
  }
});

server.get('/ProductosPorCategoria/:categoria', (req, res) => {
  let { categoria } = req.params;

  if (categoria) {
    Category.findAll({
      where: { taste: categoria },
      include: { model: Product },
    }).then((s) => {
      res.json(s);
    });
    // Product.findByPk(categoria).then((product) => {
    //   return res.send(product);
    // });
  } else {
    return res.status(404).send('No existe el producto');
  }
});

server.put('/:id', (req, res) => {
  let { id } = req.params;
  let { name, price, description, yearHarvest, image, stock } = req.body;

  console.log('modifico producto');

  if (id) {
    Product.update(
      { name, price, description, yearHarvest, image, stock },
      { where: { id } }
    ).then(() => {
      return res.status(200).send('El producto ha sido actualizado');
    });
  } else {
    return res.status(400).send('El producto no existe');
  }
});

server.put('/category/:id', (req, res) => {
  let { id } = req.params;

  console.log('Modifico categoría');

  if (id) {
    Category.update({ taste }, { where: { id } }).then(() => {
      return res.status(200).send('Se ha modificado la categoría');
    });
  } else {
    return res.status(400).send('La categoría no existe');
  }
});

server.delete('/:id', (req, res) => {
  let { id } = req.params;

  console.log('elimino un producto');

  if (id) {
    Product.destroy({
      where: {
        id,
      },
    }).then(() => {
      return res.status(200);
    });
  } else {
    return res.status(400).send('No se encontró el producto a eliminar');
  }
});

server.delete('/category/:id', (req, res) => {
  let { id } = req.params;

  console.log('entré a borrar categoría');

  if (id) {
    Category.destroy({
      where: {
        id,
      },
    }).then(() => {
      return res.status(200);
    });
  } else {
    return res.status(400).send('No existe la categoría');
  }
});

// server.post("/", (req, res) => {
//   let { name, price, description, yearHarvest, image, stock } = req.body;

//   console.log("entré a post products");

//   Product.findOrCreate({
//     where: {
//       name,
//     },
//     defaults: {
//       name, price,   description,       yearHarvest,       image,       stock: 0,
//     },
//   })
//     .then((product) => {
//       // Asignar o sumar stock
//       product.stock = +stock;
//       return res.send(201);
//     })
//     .catch((err) => {
//       return console.log(err);
//     });
// });

server.post('/', (req, res, next) => {
  let {
    name,
    price,
    description,
    yearHarvest,
    image,
    stock,
    categories,
  } = req.body;
  console.log('entré a post products');
  //const categories = categories;
  Product.create({
    name,
    price,
    description,
    yearHarvest,
    image,
    stock,
  })
    .then((product) =>
      categories.forEach((categoryId) => {
        Category.findByPk(categoryId).then((category) =>
          product.addCategory(category)
        );
      })
    )
    .then(() => res.sendStatus(201))
    .catch(next);
});

server.post('/category', (req, res) => {
  let { taste } = req.body;

  console.log('Creo o modifico categoría');

  if (taste) {
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
  } else {
    return res.status(400);
  }
});

server.post('/strain', (req, res) => {
  let { name, description, pairing, origin } = req.body;

  console.log('Creo o modifico cepa');

  if (name) {
    Strain.findOrCreate({
      where: {
        name,
      },
      defaults: {
        name,
        description,
        pairing,
        origin,
      },
    }).then((strain) => {
      return res.status(200).send('La cepa ha sido creada');
    });
  } else {
    return res.status(400);
  }
});

server.post('/:idProduct/category/:idCategory', (req, res) => {
  let { idProduct, idCategory } = req.params;

  console.log('actualizo categoría de producto');

  if (idProduct && idCategory) {
    Product.findByPk(idProduct).then((product) => {
      product.idCategory = idCategory;
      return res.send('Se actualizó la categoría');
    });
  } else {
    return res.status(400);
  }
});

module.exports = server;
