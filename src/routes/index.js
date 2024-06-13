"use strict"

const express = require("express")
const router = express.Router()

router.use("/v1/api/auth", require("./auth"))
router.use("/v1/api", require("./medicine"))
router.use("/v1/api", require("./article"))
router.use("/v1/api", require("./order"))

module.exports = router
