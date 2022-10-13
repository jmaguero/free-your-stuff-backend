'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      message.belongsTo(models.chat, { foreignKey: "chatId" })
      message.belongsTo(models.user, { foreignKey: "sender" })
      message.belongsTo(models.user, { foreignKey: "receiver" })
      message.hasOne(models.user)
    }
  }
  message.init({
    message: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};