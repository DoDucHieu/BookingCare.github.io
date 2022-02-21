"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorInfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DoctorInfor.belongsTo(models.User, { foreignKey: "doctorId" });
      DoctorInfor.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceData",
      });
      DoctorInfor.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
      DoctorInfor.belongsTo(models.Allcode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentData",
      });
      DoctorInfor.belongsTo(models.Allcode, {
        foreignKey: "specialtyId",
        targetKey: "keyMap",
        as: "specialtyData",
      });
    }
  }
  DoctorInfor.init(
    {
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.STRING,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DoctorInfor",
      freezeTableName: true,
    }
  );
  return DoctorInfor;
};
