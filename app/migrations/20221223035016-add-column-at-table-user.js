"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction((myTransaction) => {
      return Promise.all([
        queryInterface.addColumn(
          "Users",
          "username",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: myTransaction }
        ),

        queryInterface.addColumn(
          "Users",
          "password",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: myTransaction }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([queryInterface.removeColumn("Users", "username", { transaction: t }), queryInterface.removeColumn("Users", "password", { transaction: t })]);
    });
  },
};
