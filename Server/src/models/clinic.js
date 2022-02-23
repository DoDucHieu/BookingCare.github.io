"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clinic.belongsTo(models.Allcode, {
        foreignKey: "clinicId",
        targetKey: "keyMap",
        as: "clinicName",
      });
      Clinic.hasMany(models.DoctorInfor, {
        foreignKey: "clinicId",
      });
      Clinic.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
    }
  }
  Clinic.init(
    {
      clinicId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      clinicAddress: DataTypes.STRING,
      contentMarkdown: DataTypes.TEXT,
      contentHTML: DataTypes.TEXT,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "Clinic",
    }
  );
  return Clinic;
};
