const server = require('express').Router();
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { makeJWT } = require('../utils');
// Ruta ME

server.get('/me', async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findByPk(id);
      res.json(result);
    } else res.sendStatus(401);
  } catch (error) {
    next(error);
  }
});

// Ruta para desloguearse (Habría que probarla a ver si anda)

server.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

//Ruta para Registrarse
server.post(
  '/register',
  passport.authenticate('register', { session: false }),
  async (req, res) => {
    console.log('REGISTEr', req.body);
    const token = makeJWT(req.body);
    return res.json({
      message: 'Registro exitoso',
      token,
      user: req.user,
    });
  }
);
// server.post('/register', async function (req, res, next) {
//   try {
//     const user = await User.create(req.body);
//     const {
//       id,
//       firstName,
//       lastName,
//       email,
//       birthdate,
//       cellphone,
//       role,
//       password,
//     } = user;
//     return res.send(
//       jwt.sign(
//         {
//           id,
//           firstName,
//           lastName,
//           email,
//           birthdate,
//           cellphone,
//           role,
//           password,
//         },
//         'secret word'
//       )
//     );
//   } catch (error) {
//     res.sendStatus(500).send(error);
//   }
// });

//Ruta para Loguearse
server.post(
  '/login',
  passport.authenticate('local-login', { session: false }),
  async (req, res) => {
    const user = req.body;
    const token = makeJWT(user);
    return res.json({
      message: 'login exitoso',
      token,
      user,
    });
  }
);

//*ruta para probar la validacion con el JWT
server.post(
  '/test',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log('INGRESO A RUTA PROTEGIDA', req.body);
    res.send(200).json('prueba de ruta protegia');
  }
);

// server.post('/login', (req, res) => {
//   console.log('req', req.body);
// });

// server.post('/login', async function (req, res, next) {
//   const { password, email } = req.body;
//   if (!password || !email) {
//     res.sendStatus(400).send('Tienes que ingresar Email y Password');
//   }
//   try {
//     User.findOne({
//       where: { email },
//     }).then((correctUser) => {
//       const prueba = correctUser.compare(password);
//       // console.log(prueba)
//       if (correctUser.compare(password)) {
//         res.send({
//           firstName: correctUser.firstName,
//           lastName: correctUser.lastName,
//           id: correctUser.id,
//           email: correctUser.email,
//         }); // en el front, si recibe 200, guardar el user en el Store.
//       } else {
//         res.sendStatus(401); // si recibe 401, rechazar la conexión???
//       }
//     });
//   } catch (error) {
//     res.send(error);
//   }
// });

// Hacer admin a un user (promote User)

server.put('/:id', (req, res) => {
  let { id } = req.params;
  if (!id) return res.status(400).send('El usuario no existe');

  User.findByPk(id)
    .then(User.update({ isAdmin: true }, { where: { id } }))
    .then(() => {
      return res.status(200).send('Se ha ascendido el usuario a Admin');
    });
});

//Reiniciar la contraseña

server.put('/pass/:id', (req, res) => {
  let { id } = req.params;
  let { password } = req.body;

  if (!id) return res.status(400).send('El usuario no existe');

  User.findByPk(id)
    .then(User.update({ password }, { where: { id } }))
    .then(() => {
      return res
        .status(200)
        .send('Se ha modificado la contraseña correctamente');
    });
});

module.exports = server;
