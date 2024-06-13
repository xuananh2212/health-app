const { SuccessResponse, CREATED } = require("../core/success.response.js");
const OrderService = require("../services/order.service.js");
class OrderController {
  static getAllOrders = async (req, res) => {
    new SuccessResponse({
      message: "Get all orders Success!",
      metadata: await OrderService.getAllOrders(req.query),
    }).send(res)
  }

  static createOrder = async (req, res) => {
    new CREATED({
      message: "Create order OK!",
      metadata: await OrderService.createOrder(req.body),
    }).send(res)
  }

  static deleteOrder = async (req, res) => {
    new SuccessResponse({
      message: "Delete order Success!",
      metadata: await OrderService.deleteOrder(req.query),
    }).send(res)
  }

  static updateOrder = async (req, res) => {
    new SuccessResponse({
      message: "Update order Success!",
      metadata: await OrderService.updateOrder(req.body),
    }).send(res)
  }
}

module.exports = OrderController