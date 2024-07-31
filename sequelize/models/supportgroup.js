'use strict';

module.exports = (sequelize, DataTypes) => {
  const SupportGroup = sequelize.define('SupportGroup', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});

  SupportGroup.associate = function(models) {
    SupportGroup.belongsToMany(models.User, { through: 'GroupMembership', foreignKey: 'groupId' });
  };

  return SupportGroup;
};
