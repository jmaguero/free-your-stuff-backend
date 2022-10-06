'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsTo(models.user)
      product.hasMany(models.category)
      product.belongsToMany(models.category, { through: "categoryId" })
    }
  }
  product.init({
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    imgUrl: { type: DataTypes.STRING, allowNull: false },
    isAvailable: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    condition: { type: DataTypes.ENUM("good", "regular", "bad"), allowNull: false },
    lat: { type: DataTypes.FLOAT, allowNull: false },
    long: { type: DataTypes.FLOAT, allowNull: false },
    categoryId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};