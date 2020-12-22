const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validation: {
          isDate: true,
        },
      },
      cellphone: {
        type: DataTypes.BIGINT,
        validate: {
          isNumeric: true,
        },
      },
      role: {
        type: DataTypes.ENUM(['user', 'admin']),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true, // Funcionalidad completa será agregada más adelante
        set(value) {
          if (value) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue("password", hash);
          }
        },      
      },
    }, { timestamps: false },
    {
      hooks: {
        beforeCreate: function (user) {
          let ageCheck = new Date();
          ageCheck.setFullYear(ageCheck.getFullYear() - 18);
          let bd = new Date(user.birthdate);
          if (ageCheck < bd) {
            throw new Error('Solo apto para mayores de edad');
          }
        },
      },
    }
  );
  User.prototype.compare = function (pass) {
    return bcrypt.compareSync(pass, this.password);

  }
  return User;
};
