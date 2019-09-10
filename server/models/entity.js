'use strict';
module.exports = (sequelize, DataTypes) => {
  const Entity = sequelize.define('Entity', {
    entity_id: DataTypes.INTEGER,
    entity_type: DataTypes.SMALLINT
  }, {});
  Entity.associate = function(models) {
    // associations can be defined here
    Entity.belongsToMany(models.User, {
      through: models.Liked_Entity,
      as: "liked_entity",
      foreignKey: "entity_id"
    });
  };
  return Entity;
};