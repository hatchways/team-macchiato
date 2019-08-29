'use strict';
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Relationships', {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
         },
         requester_id: {
            type: Sequelize.INTEGER,
            references: {
               model: "Users",
               key: "id",
               as: "requester"
            }
         },
         requestee_id: {
            type: Sequelize.INTEGER,
            references: {
               model: "Users",
               key: "id",
               as: "requestee"
            }
         },
         status: {
            type: Sequelize.SMALLINT
         },
         // action_user_id: {
         //    type: Sequelize.INTEGER,
         //    references: {
         //       model: "Users",
         //       key: "id",
         //       as: "initiator_id"
         //    }
         // },
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
      return queryInterface.dropTable('Relationships');
   }
};