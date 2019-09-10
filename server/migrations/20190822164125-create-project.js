"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entity_id: {
         allowNull: false,
         type: Sequelize.INTEGER,
         references: {
            model: "Entities",
            key: "entity_id",
            as: "entity_id",
          }
      },
      photos: {
        type: Sequelize.ARRAY(Sequelize.TEXT)
      },
      title: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      },
      link: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER,
        // onDelete: "CASCADE",       
        allowNull: false,
        references: { model: "Users", key: "id" }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Projects");
  }
};
