const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { User } = require('../db.js');
const { capitalize } = require('../utils');
const makeJWT = require('../utils');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('./jwt').SECRET_KEY;

const isLogged = (req, res, next) => {
  if (req.isLogged()) {
    return next();
  }

  return res.sendStatus(401);
};

const isAdmin = () => {
  return function (req, res, next) {
    if (!req.user || (req.user.isAdmin = false)) {
      return response.sendStatus(401);
    }
    return next();
  };
};

module.exports = function (passport) {
  //*Estrategia para registro de un nuevo usuario
  passport.use(
    'register-local',
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
          // console.log('REGISTER STRATEGY', user_obj);
          return done(null, user_obj);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

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
        session: false,
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            console.log('NO SUCH USER');
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

  const cookieExtractor = (req) => {
    let token = null;
    if (req.signedCookies && req.signedCookies.refreshToken)
      token = req.signedCookies.refreshToken.token;
    return token;
  };

  //?Opciones de JWT
  const jwtCookies_options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: SECRET_KEY,
  };

  passport.use(
    'jwt-cookie',
    new JWTstrategy(jwtCookies_options, async (jwt_payload, done) => {
      console.log('jwtCookie_PAYLOAD', jwt_payload);
      try {
        const user = await User.findOne({
          where: { email: jwt_payload.sub },
        });
        if (!user) {
          return done(null, false, {
            message: 'No se encontro el usuario',
          });
        }
        let user_obj = { ...user.dataValues };
        delete user_obj.password;
        console.log('RETURN JWT', user_obj);
        return done(null, user_obj, { message: 'Token Autorizado' });
      } catch (error) {
        return done('CATCHING', error);
      }
    })
  );

  //?Opciones de JWT
  const jwt_options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY,
  };
  //*estrategia para login con JWT
  passport.use(
    'jwt',
    new JWTstrategy(jwt_options, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({
          where: { email: jwt_payload.user.email },
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

  const refreshCookieExtractor = (req) => {
    let token = null;
    if (req && req.signedCookies) token = req.signedCookies.refreshToken.token;
    // console.log('REFRESH COOKIE EXTRACTOR->TOKEN', token);
    return token;
  };

  const jwtRefresh_options = {
    jwtFromRequest: refreshCookieExtractor,
    secretOrKey: SECRET_KEY,
  };
  //*Refresh strategy
  passport.use(
    'jwt-refresh',
    new JWTstrategy(jwtRefresh_options, async (jwt_payload, done) => {
      // console.log('REFRESHING STRAT', jwt_payload);
      try {
        return done(null, jwt_payload.user, { message: 'Token Autorizado' });
      } catch (error) {
        return done(error);
      }
    })
  );
};
