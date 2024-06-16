const { NotFoundError, BadRequestError } = require("../core/error.response")
const { Doctor, DoctorGroup } = require("../models/index");
class DoctorService {
  static getAllDoctors = async ({ page, limit, doctorGroupId }) => {
    const options = {
      order: [["created_at", "desc"]],

    }
    if (doctorGroupId) {
      options.where = {
        doctor_group_id: doctorGroupId,
      }
    }
    if (!+page || page < 0) {
      page = 1
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit
      const offset = (page - 1) * limit
      options.offset = offset
    }

    const { rows: doctors, count } = await Doctor.findAndCountAll(options)
    return {
      doctors,
      count,
    }
  }
  static getDoctorDetail = async ({ id }) => {
    const doctor = await Doctor.findByPk(id)
    if (!doctor) {
      throw new NotFoundError("Doctor không tồn tại!")
    }
    return doctor
  }
  static createDoctor = async (payload) => {
    const doctorGroup = await DoctorGroup.findByPk(payload.doctor_group_id);
    if (!doctorGroup) {
      throw new NotFoundError("DoctorGroup không tồn tại!")
    }
    const {
      name, image, address, phone, exp, price, doctor_group_id,
    } = payload;
    const doctor = await Doctor.create(payload)
    if (!doctor) throw new BadRequestError("Create Doctor error")
    return doctor
  }
}

module.exports = DoctorService