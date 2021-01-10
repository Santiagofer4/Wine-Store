const { session } = require('passport');
const passport = require('passport');
const { User } = require('../db.js');

const checkAdmin = async (req, res, next) => {
  console.log('CHECKING IF ADMIN');
  const { id, isAdmin } = req.user;
  //*la forma mas segura, levantamos el id recibido en el token y buscamos en la DB
  //   const user = await User.findByPk(id);
  //   if (user.dataValues.isAdmin) {
  //     return next();
  //   } else {
  //     return res.status(401).send({ message: 'No posee el nivel de acceso' });
  //   }

  //*La forma facil, levantamos la data del token
  if (isAdmin) {
    return next();
  } else {
    return res.status(401).send({ message: 'No posee el nivel de acceso' });
  }
};

exports.checkAdmin = checkAdmin;
