const server = require('express').Router();
const { Strain } = require('../db.js');

server.get('/', (req, res, next) => {
  // console.log('Trae todas las cepas - GET a /strain');
  Strain.findAll()
    .then((strain) => {
      return res.status(200).json(strain);
    })
    .catch(next);
});

server.post('/', (req, res) => {
  let { name, description, pairing, origin } = req.body;
  // console.log('Creo o modifico cepa - POST a /strain');
  if (!name)
    return res.status(400).send('No se puede crear o modificar la cepa');

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
    // console.log('200 OK', strain);
    return res.status(201).send(strain);
  });
});

server.delete('/:id', (req, res) => {
  let { id } = req.params;

  if (!id) return res.status(400).send('No se puede eliminar la cepa');

  Strain.destroy({
    where: {
      id,
    },
  }).then((strain) => {
    console.log('200 OK - DELETED');
    return res.sendStatus(200).send(strain);
  });
});

module.exports = server;
