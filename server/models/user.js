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
    // Relationships table
    User.belongsToMany(models.User, {
      through: models.Relationships,
      as: "Relationship",
      foreignKey: "user_one_id"
    });
    User.belongsToMany(models.User, {
      through: models.Relationships,
      as: "Relationship",
      foreignKey: "user_two_id"
    });
    User.belongsToMany(models.User), {
       through: models.Relationships,
       as: "Relationship",
       foreignKey: "action_user_id"
    }
  };
  return User;
};
