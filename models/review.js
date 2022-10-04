'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      review.belongsTo(models.user, { foreignKey: "userId" })
      review.belongsTo(models.user, { foreignKey: "userReceiverId" })
    }
  }
  review.init({
    type: {
      type: DataTypes.ENUM("giver", "receiver"),
      allowNull: false
    },
    onTimeGiver: DataTypes.BOOLEAN,
    onTimeReceiver: DataTypes.BOOLEAN,
    stuffCondition: { type: DataTypes.ENUM("good", "regular", "bad"), allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: false },
    userReviewerId: { type: DataTypes.INTEGER, allowNull: false },
    userReviewedId: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'review',
  });
  return review;
};