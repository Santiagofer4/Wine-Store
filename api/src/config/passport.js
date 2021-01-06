const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { User } = require('../db.js');
const SECRET_KEY = require('../config/jwt.js');
const { capitalize } = require('../utils');

//*Estrategia para registro de un nuevo usuario
module.exports = function (passport) {
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
          let user_obj = { ...user };
          delete user_obj.dataValues.password;
          done(null, user_obj.dataValues);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );

  const jwt_options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: SECRET_KEY,
  };
  passport.use(
    'jwt-login',
    new JWTstrategy(jwt_options, async (jwt_payload, done) => {
      console.log('JWT_PAYLOAD', jwt_payload);
      try {
        const user = await User.findOne({ where: { email: jwt_payload.sub } });
        if (!user) {
          return done(null, false, { message: 'No se encontro el usuario' });
        }
        const validate = await user.compare(password);
        if (!validate) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user, { message: 'Login correcto' });
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
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

          return done(null, user, { message: 'Login correcto' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
