'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        title: "Furniture",
        description: "Variated furniture. For home and work",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyX1XN-pJARemwC6ESqBR5uGtwMkVZ2NBrpg&usqp=CAU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Home",
        description: "All for your home",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyX1XN-pJARemwC6ESqBR5uGtwMkVZ2NBrpg&usqp=CAU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Outdoors",
        description: "Outdoors Utils",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyX1XN-pJARemwC6ESqBR5uGtwMkVZ2NBrpg&usqp=CAU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Tools",
        description: "Variated tools",
        imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyX1XN-pJARemwC6ESqBR5uGtwMkVZ2NBrpg&usqp=CAU",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Sports",
        description: "Variated Sports",
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
