"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Project, { foreignKey: "userId" });
    User.belongsToMany(models.Skill, {
      through: models.UserSkill,
      as: "skills",
      foreignKey: "userId"
    });
  };
  return User;
};
