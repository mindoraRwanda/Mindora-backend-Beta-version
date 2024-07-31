'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserExercise = sequelize.define('UserExercise', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    exerciseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Exercises',
        key: 'id'
      }
    },
    completedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {});

  return UserExercise;
};
