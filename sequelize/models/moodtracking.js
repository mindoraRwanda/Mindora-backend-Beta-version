'use strict';

module.exports = (sequelize, DataTypes) => {
  const MoodTracking = sequelize.define('MoodTracking', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    mood: DataTypes.STRING,
    loggedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});

  MoodTracking.associate = function(models) {
    MoodTracking.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return MoodTracking;
};
