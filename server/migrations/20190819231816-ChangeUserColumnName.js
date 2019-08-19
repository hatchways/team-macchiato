"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Users", "name", "userName");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("Users", "userName", "name");
  }
};
