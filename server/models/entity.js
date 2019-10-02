"use strict";
module.exports = (sequelize, DataTypes) => {
  const Entity = sequelize.define(
    "Entity",
    {
      // entity_id: DataTypes.INTEGER
    },
    {}
  );
  Entity.associate = function(models) {
    // associations can be defined here
    Entity.belongsToMany(models.User, {
      through: models.Liked_Entity,
      as: "users",
      foreignKey: "entity_id"
    });
  };
  return Entity;
};
