'use strict';
module.exports = (sequelize, DataTypes) => {
  const Liked_Entity = sequelize.define('Liked_Entity', {
    user_id: DataTypes.INTEGER,
    entity_id: DataTypes.INTEGER
  }, {});
  Liked_Entity.associate = function(models) {
    // associations can be defined here
  };
  return Liked_Entity;
};