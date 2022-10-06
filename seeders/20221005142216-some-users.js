'use strict';
const bcrypt = require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: "Admin",
        lastname: "Master",
        email: "admin@admin.com",
        password: bcrypt.hashSync("admin", 10),
        giverRating: null,
        receiverRating: null,
        inBlocked: false,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User",
        lastname: "Standard",
        email: "user@standard.com",
        password: bcrypt.hashSync("user", 10),
        giverRating: null,
        receiverRating: null,
        inBlocked: false,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "User",
        lastname: "Blocked",
        email: "user@blocked.com",
        password: bcrypt.hashSync("blocked", 10),
        giverRating: null,
        receiverRating: null,
        inBlocked: true,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  }
};
