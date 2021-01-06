const server = require('express').Router();
const { Product, Review, User } = require('../db.js');

//Crea una Review para un producto. Faltaría agregar al usuario, pero aún no tenemos login.

server.post('/:idProduct/', (req, res) => {
  let { idProduct } = req.params;
  let { points, description } = req.body;
  console.log('Creo Review - POST a /review/:idProduct/');

  if (!idProduct || !points)
    return res.status(400).send('No se puede agregar la Review');

  console.log('ENTRÉ');
  Review.create({
    points,
    description,
  }).then((rev) => {
    Product.findByPk(idProduct).then((product) => {
      product.addReview(rev);
      return res.send('Se agregó la Review');
    });
  });
});

//Editar una Review

server.put('/:id', (req, res) => {
  let { points, description } = req.body;
  let { id } = req.params;
  console.log('Edito Review - PUT a /product/:id/review/:idReview');

  if (!id) return res.status(400).send('La Review no se encuentra');
  Review.update({ points, description }, { where: { id } }).then(() => {
    return res.status(200).send('Se ha modificado la categoría');
  });
});

//Borrar una Review

server.delete('/:id', (req, res) => {
  let { id } = req.params;
  console.log('Borro Review - delete a /product/:id/review/:idReview');

  if (!id) return res.status(400).send('No existe la Review');

  Review.destroy({
    where: {
      id,
    },
  }).then(() => {
    return res.send(200, `Review ${id} borrada`);
  });
});

//Ver todas las Reviews de un Producto

server.get('/:id', (req, res, next) => {
  let { id } = req.params;
  console.log('Ver Reviews de un producto - GET a /review/:id');

  if (!id) return res.status(404).send('No existen reviews para ese producto');

  Review.findAll({
    include: { model: Product, where: { id } },
  })
    .then((revs) => {
      res.json(
        revs.map((r) => {
          return { id: r.id, points: r.points, description: r.description };
        })
      );
    })
    .catch(next);
});

module.exports = server;