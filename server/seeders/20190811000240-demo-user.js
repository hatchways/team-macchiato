"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John",
          email: "demo@demo.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Darius",
          email: "darius@demo.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Ashe",
          email: "ashe@demo.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Pikachu",
          email: "pikachu@demo.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Agumon",
          email: "agumon@demo.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Celtic Gaurdian",
          email: "Celtic@demo.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Dark Magician",
          email: "darkmagician@demo.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Patamon",
          email: "patamon@demo.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
