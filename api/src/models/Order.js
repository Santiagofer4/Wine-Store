const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("order", {
    total: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  });
};