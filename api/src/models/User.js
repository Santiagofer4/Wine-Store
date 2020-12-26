const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
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
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true, // Funcionalidad completa será agregada más adelante
      },
    },// { timestamps: false },
    {
      timestamps: false,
      hooks: {
        beforeCreate (user) {
          let ageCheck = new Date();
          ageCheck.setFullYear(ageCheck.getFullYear() - 18);
          let bd = new Date(user.birthdate);
          if (ageCheck < bd) {
            throw new TypeError('Solo apto para mayores de edad');
          }
        },
      },
    }
  );
};