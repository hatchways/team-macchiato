"use strict";
module.exports = (sequelize, DataTypes) => {
  const Entity_Comment = sequelize.define(
    "Entity_Comment",
    {
      comment: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      entity_id: DataTypes.INTEGER,
      target_entity_id: DataTypes.INTEGER
    },
    {}
  );
  Entity_Comment.associate = function(models) {
    Entity_Comment.belongsTo(models.Entity, { foreignKey: "entity_id" });
    Entity_Comment.belongsTo(models.User, { foreignKey: "user_id" });
  };
  return Entity_Comment;
};
