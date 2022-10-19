'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('messages', [
      {
        message: "This is a test message",
        chatId: 1,
        sender: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "This is a test message",
        chatId: 1,
        sender: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "This is a test message",
        chatId: 1,
        sender: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "This is a test message",
        chatId: 1,
        sender: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "This is a test message",
        chatId: 1,
        sender: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "This is a test message",
        chatId: 1,
        sender: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "This is a test message",
        chatId: 2,
        sender: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "This is a test message",
        chatId: 2,
        sender: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "This is a test message",
        chatId: 2,
        sender: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        message: "This is a test message",
        chatId: 2,
        sender: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("messages", null, {});
  }
};
