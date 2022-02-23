"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("DoctorInfor", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      specialtyId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      clinicId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      priceId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      paymentId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      note: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("DoctorInfor");
  },
};
