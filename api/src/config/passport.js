const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../db');

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
        const { firstName, lastName, email, birthdate, password } = req.body;
        const user_data = { firstName, lastName, email, birthdate, password };
        const user = await User.create(user_data);
        console.log('PASS USER', user);
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// passport.use('jwt-login', new JWTstrategy());

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
