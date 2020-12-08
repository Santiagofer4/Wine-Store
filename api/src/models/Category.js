const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("category", {
    name: {
      // Tinto, blanco, rosado
      type: DataTypes.ENUM( ["tinto", "blanco", "rosado"] ),
      allowNull: false,
    },
  });
};
