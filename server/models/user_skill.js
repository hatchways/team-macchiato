'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Skill = sequelize.define('User_Skill', {
    user_id: DataTypes.INTEGER,
    skill_id: DataTypes.INTEGER
  }, {});
  User_Skill.associate = function(models) {
    // associations can be defined here
  };
  return User_Skill;
};