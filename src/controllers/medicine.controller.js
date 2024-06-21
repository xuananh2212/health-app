const { SuccessResponse, CREATED } = require("../core/success.response.js");
const MedicineService = require("../services/medicine.service.js");
class MedicineController {
  static getAllMedicines = async (req, res) => {
    new SuccessResponse({
      message: "Get all medicines Success!",
      data: await MedicineService.getAllMedicines(req.query),
    }).send(res)
  }

  static getMedicineDetail = async (req, res) => {
    new SuccessResponse({
      message: "Get medicine detail Success!",
      data: await MedicineService.getMedicineDetail(req.params),
    }).send(res)
  }

  static createMedicine = async (req, res) => {
    new CREATED({
      message: "Create medicine OK!",
      data: await MedicineService.createMedicine(req.body),
    }).send(res)
  }
}

module.exports = MedicineController