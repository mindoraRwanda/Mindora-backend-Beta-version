'use strict';

module.exports = (sequelize, DataTypes) => {
  const EmergencyContact = sequelize.define('EmergencyContact', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    contactName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    contactInfo: DataTypes.STRING
  }, {});

  EmergencyContact.associate = function(models) {
    EmergencyContact.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return EmergencyContact;
};
