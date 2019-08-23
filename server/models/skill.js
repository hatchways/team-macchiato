'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    skill: DataTypes.STRING
  }, {});
  Skill.associate = function(models) {
    // associations can be defined here
  };
  return Skill;
};