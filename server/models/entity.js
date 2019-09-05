'use strict';
module.exports = (sequelize, DataTypes) => {
  const Entity = sequelize.define('Entity', {
    entity_id: DataTypes.INTEGER,
  }, {});
  Entity.associate = function(models) {
    // associations can be defined here
<<<<<<< HEAD
    Entity.belongsToMany(models.User, {
      through: models.Liked_Entity,
      as: "liked_entity",
      foreignKey: "entity_id"
    });
=======
>>>>>>> #43
  };
  return Entity;
};