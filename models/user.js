'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.product);
      user.hasMany(models.review, { foreignKey: "userGiverId" });
      user.hasMany(models.review, { foreignKey: "userReceiverId" });
    }
  }
  user.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    giverRating: DataTypes.INTEGER,
    receiverRating: DataTypes.INTEGER,
    inBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};