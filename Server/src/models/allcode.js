"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcode.hasMany(models.User, {
        foreignKey: "positionId",
        as: "positionData",
      });
      Allcode.hasMany(models.User, {
        foreignKey: "gender",
        as: "genderData",
      });
      Allcode.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeData",
      });
      Allcode.hasMany(models.DoctorInfor, {
        foreignKey: "priceId",
        as: "priceData",
      });
      Allcode.hasMany(models.DoctorInfor, {
        foreignKey: "paymentId",
        as: "paymentData",
      });
      Allcode.hasMany(models.DoctorInfor, {
        foreignKey: "specialtyId",
        as: "specialtyData",
      });
      Allcode.hasOne(models.Specialty, {
        foreignKey: "specialtyId",
        as: "specialtyName",
      });
      Allcode.hasOne(models.Clinic, {
        foreignKey: "clinicId",
        as: "clinicName",
      });
      Allcode.hasMany(models.Clinic, {
        foreignKey: "provinceId",
        as: "provinceData",
      });
      Allcode.hasMany(models.Booking, {
        foreignKey: "timeType",
        as: "patientTimeData",
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
