'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        allowNull: false, type: Sequelize.STRING
      },
      password: {
        allowNull: false, type: Sequelize.STRING
      },
      giverRating: {
        type: Sequelize.INTEGER
      },
      receiverRating: {
        type: Sequelize.INTEGER
      },
      inBlocked: {
        type: Sequelize.BOOLEAN, defaultValue: false
      },
      isAdmin: {
        type: Sequelize.BOOLEAN, defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};