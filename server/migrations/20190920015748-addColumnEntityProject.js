module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "Projects",
          "entity_id",
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "Entities", key: "id" }
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Project", "entity_id", { transaction: t })
      ]);
    });
  }
};
