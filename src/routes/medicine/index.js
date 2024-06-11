"use strict"
const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const MedicineController = require("../../controllers/medicine.controller")
const router = express.Router()

router.get("/medicines", asyncHandler(MedicineController.getAllMedicines()))
router.get("/medicine", asyncHandler(MedicineController.getMedicineDetail()))
router.post("/medicine", asyncHandler(MedicineController.createMedicine()))

module.exports = router