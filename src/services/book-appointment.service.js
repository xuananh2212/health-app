
const { Op } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const doctor = require("../models/doctor");
const { Doctor, User } = require("../models/index");
class BookAppointmentService {
     static getAllBookAppointment = async ({ page, limit, userId }) => {
          const options = {
               order: [["created_at", "desc"]],

          }
          if (userId) {
               options.where = {
                    id: userId,
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
     static createBookAppointment = async (payload) => {
          const doctorFind = await Doctor.findByPk(payload.doctor_id);
          const userFind = await User.findByPk(payload.user_id);
          if (!doctorFind) {
               throw new NotFoundError("doctorId không tồn tại!")
          }
          if (!userFind) {
               throw new NotFoundError("userId không tồn tại!")
          }
          const startTime = new Date(payload.startTime);
          const endTime = new Date(payload.endTime);
          // const checkAppointment = await Doctor.findOne({
          //      where: {
          //           id: payload.doctor_id,

          //      },
          //      include: [{
          //           model: User,
          //           through: {
          //                attributes: ['user_id', "doctor_id", 'start_time', 'end_time'],
          //                where: {
          //                     start_time: {
          //                          [Op.lt]: endTime
          //                     },
          //                     end_time: {
          //                          [Op.gt]: startTime
          //                     }
          //                }

          //           },
          //           attributes: ['id', 'name', 'email']

          //      }
          //      ],
          // })
          // console.log('checkAppointment', checkAppointment);
          // console.log('payload.startTime', startTime);
          // if (checkAppointment && checkAppointment.Users.length > 0) {
          //      throw new ForbiddenError("Thời gian hẹn trùng lặp với lịch hẹn hiện có.");
          // }

          const result = await userFind.addDoctor(doctorFind,
               {
                    through:
                    {
                         start_time: startTime,
                         end_time: endTime
                    }
               });

          if (!result) throw new BadRequestError("Create Doctor error")
     }
}

module.exports = BookAppointmentService