'use strict';

module.exports = (sequelize, DataTypes) => {
  const SymptomLogging = sequelize.define('SymptomLogging', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    symptom: DataTypes.STRING,
    severity: DataTypes.INTEGER,
    loggedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});

  SymptomLogging.associate = function(models) {
    SymptomLogging.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return SymptomLogging;
};
