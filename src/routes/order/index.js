"use strict"
const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const OrderController = require("../../controllers/order.controller")
const router = express.Router()

router.get("/orders", asyncHandler(OrderController.getAllOrders))
router.post("/order", asyncHandler(OrderController.createOrder))
router.patch("/:id", asyncHandler(OrderController.updateOrder))
router.delete("/:id", asyncHandler(OrderController.deleteOrder))
module.exports = router