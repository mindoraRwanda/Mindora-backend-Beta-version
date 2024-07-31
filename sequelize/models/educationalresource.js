'use strict';

module.exports = (sequelize, DataTypes) => {
  const EducationalResource = sequelize.define('EducationalResource', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {});

  return EducationalResource;
};
