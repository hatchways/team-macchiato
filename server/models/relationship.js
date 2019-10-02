'use strict';
module.exports = (sequelize, DataTypes) => {
   const Relationship = sequelize.define('Relationship', {
      requester_id: DataTypes.INTEGER,
      requestee_id: DataTypes.INTEGER,
      status: DataTypes.SMALLINT,     // 0 for pending, 1 for accepted, 2 for declined, 3 for blocked (may not include in logic)
      //  action_user_id: DataTypes.INTEGER
   }, {});
   Relationship.associate = function (models) {
      // associations can be defined here
      
   };
   return Relationship;
};