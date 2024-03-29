"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profile_pic: DataTypes.STRING,
      title: DataTypes.STRING,
      location: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Project, { foreignKey: "user_id" });

    // User_Skill
    User.belongsToMany(models.Skill, {
      through: models.User_Skill,
      as: "skills",
      foreignKey: "user_id"
    });

    // Relationships
    User.belongsToMany(models.User, {
      through: models.Relationship,
      as: "requester",
      foreignKey: "requester_id"
    });

    User.belongsToMany(models.User, {
      through: models.Relationship,
      as: "requestee",
      foreignKey: "requestee_id"
    });

    // Liked_Entity
    User.belongsToMany(models.Entity, {
      through: models.Liked_Entity,
      foreignKey: "user_id"
    });
  };
  return User;
};
