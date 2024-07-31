'use strict';

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
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
    appointmentTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: DataTypes.STRING
  }, {});

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
    Appointment.belongsTo(models.User, { as: 'Provider', foreignKey: 'providerId' });
  };

  return Appointment;
};
