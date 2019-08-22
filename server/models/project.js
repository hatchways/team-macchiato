"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      photos: DataTypes.ARRAY(DataTypes.TEXT, { defaultValue: null }),
      description: DataTypes.STRING,
      title: DataTypes.STRING,
      link: DataTypes.STRING
    },
    {}
  );
  Project.associate = function(models) {
    // Project belongs to a User
    Project.belongsTo(models.User);
  };
  return Project;
};