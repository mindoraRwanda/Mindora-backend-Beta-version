'use strict';

module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    contactInfo: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    medicalHistory: DataTypes.TEXT,
    preferences: DataTypes.JSONB
  }, {});

  Profile.associate = function(models) {
    Profile.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Profile;
};
