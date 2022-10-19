'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('chats', [
      {
        user1: 1,
        user2: 2,
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user1: 1,
        user2: 2,
        productId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user1: 1,
        user2: 2,
        productId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user1: 1,
        user2: 2,
        productId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("chats", null, {});
  }
};
