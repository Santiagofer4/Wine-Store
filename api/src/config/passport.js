const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { User } = require('../db.js');
const { capitalize } = require('../utils');
const makeJWT = require('../utils');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('./jwt').SECRET_KEY;

/**
 * CONFIGURACION DE PASSPORT
 * TODO: hacer mas modular dividiendo cada `opcion` y `estrategia` en su propia variable, luego llamarlas en el use y exportarlas
 */

module.exports = function (passport) {
  //*Estrategia para registro de un nuevo usuario
  passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const {
            firstName,
            lastName,
            email,
            birthdate,
            password,
            cellphone,
          } = req.body;
          const user_data = {
            firstName,
            lastName,
            email,
            birthdate,
            password,
            cellphone,
            isAdmin: false,
          };
          const user = await User.create(user_data);
          //clonamos el objeto user, eliminamos el campo password y devolvemos el obj user
          let user_obj = { ...user.dataValues };
          delete user_obj.password;
          done(null, user_obj);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );

  //?Opciones de JWT
  const jwt_options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
    // issuer: 'wineStore',
    // audience: 'localhost:3000',
    // usernameField: 'email',
    // passwordField: 'password',
  };

  passport.use(
    /**
     * Estrategia para hacer login con email//pass
     * comparando contra la info de la db
     * devuelve un JWT para ser utilizado en la autenticacion con la estrategia JWT
     */
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        session:false,
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: 'No se encontro el usuario' });
          }
          const validate = await user.compare(password);
          if (!validate) {
            return done(null, false, { message: 'Contraseña incorrecta' });
          }
          let user_obj = { ...user.dataValues };
          delete user_obj.password;
          console.log('RETURN LOCAL_LOGIN', user_obj);
          return done(null, user_obj, { message: 'Login correcto' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //*estrategia para login con JWT
  passport.use(
    'jwt',
    new JWTstrategy(jwt_options, async (jwt_payload, done) => {
      console.log('JWT_PAYLOAD', jwt_payload);
      /**
       * No es necesario hacer todo el try catch si
       * dentro del jwt recibimos toda la data del user
       * que necesitariamos para hacer las operaciones
       * en la DB...esto esta a modo de prueba
       *
       * Deberiamos pulir el jwt para enviar la info del user
       * y luego levantamos la info del jwt y hacemos las llamadas al a DB
       *
       * ahora busca que el usuario este en la db y devuelve esa info...no tiene mucho sentido...
       *
       */

      try {
        const user = await User.findOne({
          where: { email: jwt_payload.sub },
        });
        if (!user) {
          return done(null, false, { message: 'No se encontro el usuario' });
        }
        let user_obj = { ...user.dataValues };
        delete user_obj.password;
        console.log('RETURN JWT', user_obj);
        return done(null, user_obj, { message: 'Token Autorizado' });
      } catch (error) {
        return done(error);
      }
    })
  );
};
