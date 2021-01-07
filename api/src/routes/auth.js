const server = require('express').Router();
const { User } = require('../db.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { makeJWT, cookieMaker } = require('../utils');

// Ruta ME
server.get('/me', async (req, res, next) => {
  try {
    if (req.user) {
      const { id } = req.user;
      const result = await User.findOne(id);
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
  passport.authenticate('register-local', { session: false }),
  async (req, res) => {
    console.log('REGISTEr', req.user);
    const token = makeJWT(req.user);
    cookieMaker('jwt', token, res);
    // res.cookie('jwt', token, cookieOptions);
    return res.send({
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
// server.post(
//   '/login', //function(req,res,next)
//   passport.authenticate('local-login', {session:false} ),
//   async (req, res) => {
//     const user = req.body;
//     const token = makeJWT(user);
//     return res.json({
//       message: 'login exitoso',
//       token,
//       user,
//     });
//   }
// );

server.post(
  '/login',
  passport.authenticate('local-login', { session: false }),
  async (req, res) => {
    console.log('LOGIn', req.user);
    const token = makeJWT(req.user);
    cookieMaker('jwt', token, res);
    return res.send({
      message: 'Login exitoso',
      token,
      user: req.user,
    });
  }
);

// , function (err, user) {
//   // console.log('LOGIN', user);
//   if (err) return next(err);
//   else if (!user) res.status(401);
//   else {
//     cookieMaker('jwt', token, res);
//     return res.json({
//       message: 'Registro exitoso',
//       token: makeJWT(user),
//       user,
//     });
//   }
// })(req, res, next);

//*ruta para probar la validacion con el JWT
server.get(
  /**
   * Para probar con postman las rutas protegidas:
   * 1. verificar que la ruta y el metodo sea el correcto
   * 2. en caso que sea necesario, enviar la informacion por body en el formato correcta
   * 3. Enviar en `headers` la 'key'=>`Authorization` con la string del JWT
   * el formato es: "Bearer `aca viene el choclo de string ilegible`" (sin ninguna comilla, solo la string)
   *
   */
  '/test',
  passport.authenticate('jwt-cookie', { session: false }),
  async (req, res) => {
    console.log('INGRESO A RUTA PROTEGIDA', req.body);
    return res.send('prueba de ruta protegia');
    // return res.send(req.user);
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
