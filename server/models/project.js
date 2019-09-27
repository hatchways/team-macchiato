"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      photos: DataTypes.ARRAY(DataTypes.TEXT, { defaultValue: null }),
      desc: DataTypes.STRING,
      title: DataTypes.STRING,
      link: DataTypes.STRING
    },
    {}
  );
  Project.associate = function(models) {
    // Project belongs to a User ~
    Project.belongsTo(models.User, { foreignKey: "user_id" });
  };
  return Project;
};
