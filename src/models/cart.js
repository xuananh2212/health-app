"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      })

      Cart.belongsTo(models.Medicine, {
        foreignKey: "product_id",
        as: "medicine"
      })
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      old_price: DataTypes.FLOAT,
      new_price: DataTypes.FLOAT,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  )
  return Cart
}
