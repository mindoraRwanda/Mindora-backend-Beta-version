'use strict';

module.exports = (sequelize, DataTypes) => {
  const GroupMembership = sequelize.define('GroupMembership', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'SupportGroups',
        key: 'id'
      }
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});

  return GroupMembership;
};
