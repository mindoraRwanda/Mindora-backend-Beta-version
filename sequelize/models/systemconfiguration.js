'use strict';

module.exports = (sequelize, DataTypes) => {
  const SystemConfiguration = sequelize.define('SystemConfiguration', {
    key: {
      type: DataTypes.STRING,
      unique: true
    },
    value: DataTypes.TEXT
  }, {});

  return SystemConfiguration;
};
