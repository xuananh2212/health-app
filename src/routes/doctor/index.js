"use strict"
const express = require("express")
const asyncHandler = require("../../helpers/asyncHandler")
const DoctorController = require("../../controllers/doctor.controller");
const router = express.Router()

router.get("/doctors", asyncHandler(DoctorController.getAllDoctors))
router.get("/doctors/:id", asyncHandler(DoctorController.getDoctorDetail))
router.post("/doctors", asyncHandler(DoctorController.createDoctor))

module.exports = router