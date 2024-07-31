'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    notificationText: DataTypes.TEXT,
    sentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    type: DataTypes.STRING
  }, {});

  Notification.associate = function(models) {
    Notification.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Notification;
};
