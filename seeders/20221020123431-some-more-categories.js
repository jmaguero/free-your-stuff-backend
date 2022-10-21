'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        title: "Bikes",
        description: "Used bikes",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyX1XN-pJARemwC6ESqBR5uGtwMkVZ2NBrpg&usqp=CAU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Tools",
        description: "Used tools",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyX1XN-pJARemwC6ESqBR5uGtwMkVZ2NBrpg&usqp=CAU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Computers",
        description: "Used computers",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyX1XN-pJARemwC6ESqBR5uGtwMkVZ2NBrpg&usqp=CAU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};
