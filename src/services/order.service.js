const { NotFoundError, BadRequestError } = require("../core/error.response")
const { Cart, Medicine, User } = require("../models/index");
class CartService {
  static getAllOrders = async ({page, limit, userId}) => {
    const options = {
      order: [["created_at", "desc"]],
      where: {user_id: userId},
      include: [
        {
            model: User,
            attributes: ['name', 'email', 'status'],
            as: 'user'
        },
        {
          model: Medicine,
          attributes: ['name'],
          through: { attributes: [] },
          as: 'medicines'
        },
      ],
    }
    if (!+page || page < 0) {
      page = 1
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit
      const offset = (page - 1) * limit
      options.offset = offset
    }

    const { rows: carts, count } = await Cart.findAndCountAll(options)
    return {
      carts,
      count,
    }
  }

  static createOrder = async (payload) => {
    const { userId, productId, quantity, oldPrice, newPrice, status } = payload
    const findCart = await Cart.findOne({
      where: {
        user_id: userId,
        product_id: productId
      },
      include: [
        {
          model: Medicine,
          as: "medicines",
            attributes: ['id', 'name'], 
        },
    ],
    })
  }

  static updateOrder = async ({ idOrder, payload }) => {
    const order = await Cart.findByPk(idOrder)
    if (!order) {
      throw new NotFoundError("Order not found!")
    }
    await Cart.update(payload, {
      where: {
        id,
      },
    })
  }

  static deleteOrder = async({id}) => {
    const order = await Cart.findByPk(id)
    if (!order) {
      throw new NotFoundError("Order not found!")
    }
    const deleted = await Cart.destroy({
      where: {
        id,
      },
    })
    return deleted
  }
}

module.exports = CartService