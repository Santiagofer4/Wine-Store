const server = require('express').Router();
const { Strain } = require('../db.js');

server.get('/', (req, res, next) => {
  // console.log('Trae todas las cepas - GET a /strain');
  Strain.findAll()
    .then((strain) => {
      res.json(strain);
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
    return res.status(200).send('La cepa ha sido creada');
  });
});

module.exports = server;
