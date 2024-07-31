'use strict';

module.exports = (sequelize, DataTypes) => {
  const ProgressReport = sequelize.define('ProgressReport', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    report: DataTypes.TEXT,
    generatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});

  ProgressReport.associate = function(models) {
    ProgressReport.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return ProgressReport;
};
