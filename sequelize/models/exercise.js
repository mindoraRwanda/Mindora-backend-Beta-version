'use strict';

module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {});

  Exercise.associate = function(models) {
    Exercise.belongsToMany(models.User, { through: 'UserExercise', foreignKey: 'exerciseId' });
  };

  return Exercise;
};
