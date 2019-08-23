'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define('UserSkill', {
    userId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {});
  UserSkill.associate = function(models) {
    // associations can be defined here
  };
  return UserSkill;
};