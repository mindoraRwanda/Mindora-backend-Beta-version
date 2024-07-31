'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  User.associate = function(models) {
    User.hasOne(models.Profile, { foreignKey: 'userId' });
    User.hasMany(models.Appointment, { foreignKey: 'userId' });
    User.hasMany(models.Appointment, { foreignKey: 'providerId' });
    User.hasMany(models.Message, { foreignKey: 'senderId' });
    User.hasMany(models.Message, { foreignKey: 'receiverId' });
    User.hasMany(models.Call, { foreignKey: 'userId' });
    User.hasMany(models.Call, { foreignKey: 'providerId' });
    User.hasMany(models.MoodTracking, { foreignKey: 'userId' });
    User.hasMany(models.SymptomLogging, { foreignKey: 'userId' });
    User.hasMany(models.ProgressReport, { foreignKey: 'userId' });
    User.belongsToMany(models.SupportGroup, { through: 'GroupMembership', foreignKey: 'userId' });
    User.hasMany(models.EmergencyContact, { foreignKey: 'userId' });
    User.hasMany(models.Notification, { foreignKey: 'userId' });
    User.belongsToMany(models.Exercise, { through: 'UserExercise', foreignKey: 'userId' });
  };

  return User;
};
