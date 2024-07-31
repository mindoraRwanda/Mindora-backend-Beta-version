'use strict';

module.exports = (sequelize, DataTypes) => {
  const Call = sequelize.define('Call', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    providerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    callType: DataTypes.STRING,
    callTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    duration: DataTypes.INTEGER
  }, {});

  Call.associate = function(models) {
    Call.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
    Call.belongsTo(models.User, { as: 'Provider', foreignKey: 'providerId' });
  };

  return Call;
};
