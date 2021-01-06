const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const passport = require('passport');
require('./db.js'); //trae la DB, con todos los modelos y asociaciones
require('./config/passport.js')(passport); //pasamos la configuracion al obj global de passport
const server = express();

server.name = 'API';

/**
 * SETUP GENERAL
 */
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev')); //para logear a la terminal
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // prueba para el axios.delete, esto no deberia afectar nada, ya que el `*` implica quede recibir de cualquier direccion
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); //Linea agregada para probar por que no axios.delete no recibe ninguna respuesta
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use(passport.initialize()); //*Inicializamos el passport

server.use('/', routes); //* import de las rutas

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
