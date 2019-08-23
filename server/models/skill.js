"use strict";
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define(
    "Skill",
    {
      skill: DataTypes.STRING
    },
    {}
  );
  Skill.associate = function(models) {
    Skill.belongsToMany(models.User, {
      through: models.UserSkill,
      as: "users",
      foreignKey: "skillId"
    });
  };
  return Skill;
};
