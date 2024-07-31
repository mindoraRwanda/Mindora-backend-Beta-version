'use strict';

module.exports = (sequelize, DataTypes) => {
  const FeedbackSurvey = sequelize.define('FeedbackSurvey', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    feedback: DataTypes.TEXT,
    submittedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});

  FeedbackSurvey.associate = function(models) {
    FeedbackSurvey.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return FeedbackSurvey;
};
