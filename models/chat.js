'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      chat.hasMany(models.message)
      chat.belongsTo(models.user, { foreignKey: "user1" })
      chat.belongsTo(models.user, { foreignKey: "user2" })
      chat.belongsTo(models.product)
    }
  }
  chat.init({
    socketId: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'chat',
  });
  return chat;
};