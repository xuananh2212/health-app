const { NotFoundError, BadRequestError } = require("../core/error.response")
const { Cart, Medicine, User } = require("../models/index");
class CartService {
  static getAllOrders = async ({page, limit, userId}) => {
    const options = {
      order: [["created_at", "desc"]],
      where: { user_id: userId },
      include: [
        {
            model: User,
            attributes: ['name', 'email', 'status'],
            as: 'user'
        },
        {
          model: Medicine,
          attributes: ['name', 'description', 'image'],
          as: 'medicine'
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
    })
    let cart
    if (findCart) {
      cart = await findCart.update({quantity: +findCart.quantity + quantity})
    } else {
      cart = await Cart.create({
        user_id: userId,
        product_id: productId,
        quantity,
        old_price: oldPrice,
        new_price: newPrice,
        status: 'pending'
      })
    }
    return cart
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

  static deleteAllOrder = async ({ ids }) => {
    const carts = await Cart.destroy({
      where: {
        id: ids,
      },
    })
    return carts
  }
}

module.exports = CartService