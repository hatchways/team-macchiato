'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    photos: DataTypes.ARRAY,
    title: DataTypes.STRING,
    desc: DataTypes.STRING,
    link: DataTypes.STRING
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
  };
  return Project;
};