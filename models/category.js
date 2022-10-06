'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      category.hasMany(models.product)
      category.belongsToMany(models.product, { through: "productId" })
    }
  }
  category.init({
    title: {
      allowNull: false, type: DataTypes.STRING
    },
    description: {
      allowNull: false, type: DataTypes.STRING
    },
    imgUrl: DataTypes.STRING,
    productId: {
      allowNull: true, type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};