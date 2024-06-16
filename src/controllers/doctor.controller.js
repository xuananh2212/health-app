const { SuccessResponse, CREATED } = require("../core/success.response.js");
const DoctorService = require("../services/doctor.service.js");
class DoctorController {
  static getAllDoctors = async (req, res) => {
    new SuccessResponse({
      message: "Get all Doctors Success!",
      metadata: await DoctorService.getAllDoctors(req.query),
    }).send(res)
  }

  static getDoctorDetail = async (req, res) => {
    new SuccessResponse({
      message: "Get Doctor detail Success!",
      metadata: await DoctorService.getDoctorDetail(req.params),
    }).send(res)
  }

  static createDoctor = async (req, res) => {
    new CREATED({
      message: "Create Doctor OK!",
      metadata: await DoctorService.createDoctor(req.body),
    }).send(res)
  }
}

module.exports = DoctorController