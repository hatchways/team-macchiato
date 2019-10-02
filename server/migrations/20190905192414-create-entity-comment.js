"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Entity_Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER,
        // onDelete: "CASCADE",
        allowNull: false,
        references: { model: "Users", key: "id" }
      },
      entity_id: {
        type: Sequelize.INTEGER,
        // onDelete: "CASCADE",
        allowNull: false,
        references: { model: "Entities", key: "id" }
      },
      target_entity_id: {
        type: Sequelize.INTEGER,
        // onDelete: "CASCADE",
        allowNull: false,
        references: { model: "Entities", key: "id" }
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
    return queryInterface.dropTable("Entity_Comments");
  }
};
