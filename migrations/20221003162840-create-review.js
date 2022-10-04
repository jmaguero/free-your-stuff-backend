'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM("giver", "receiver"),
        allowNull: false
      },
      onTimeGiver: {
        type: Sequelize.BOOLEAN
      },
      onTimeReceiver: {
        type: Sequelize.BOOLEAN
      },
      stuffCondition: {
        type: Sequelize.ENUM("good", "regular", "bad"), allowNull: false
      },
      comment: {
        type: Sequelize.STRING, allowNull: false
      },
      userReviewerId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      userReviewedId: {
        type: Sequelize.INTEGER, allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
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
    await queryInterface.dropTable('reviews');
  }
};