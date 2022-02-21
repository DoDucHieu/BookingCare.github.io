"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Specialty.belongsTo(models.Allcode, {
        foreignKey: "specialtyId",
        targetKey: "keyMap",
        as: "specialtyName",
      });
    }
  }
  Specialty.init(
    {
      // id: DataTypes.STRING,
      specialtyId: DataTypes.STRING,
      contentHTML: DataTypes.TEXT,
      contentMarkdown: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Specialty",
    }
  );
  return Specialty;
};
