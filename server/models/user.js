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
   User.associate = function (models) {
      User.hasMany(models.Project, { foreignKey: "userId" });

      User.belongsToMany(models.Skill, {
         through: models.UserSkill,
         as: "skills",
         foreignKey: "userId"
      });
      
      User.belongsToMany(models.User, {
         through: models.Relationship,
         as: "requestee",
         foreignKey: "requester_id"
      });
      User.belongsToMany(models.User, {
         through: models.Relationship,
         as: "requester",
         foreignKey: "requestee_id"
      });
      // User.belongsToMany(models.User, {
      //    through: models.Relationship,
      //    as: "initiator",
      //    foreignKey: "action_user_id"
      // });
   };
   return User;
};
