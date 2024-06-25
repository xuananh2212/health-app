const { SuccessResponse, CREATED } = require("../core/success.response.js");
const BookAppointmentService = require("../services/book-appointment.service.js");
class BookAppointmentController {
     static getAllBookAppointment = async (req, res) => {
          new SuccessResponse({
               message: "Get all BookAppointment Success!",
               data: await BookAppointmentService.getAllBookAppointment(req.query),
          }).send(res)
     }
     static createBookAppointment = async (req, res) => {
          new CREATED({
               message: "Create BookAppointment OK!",
               data: await BookAppointmentService.createBookAppointment(req.body),
          }).send(res)
     }
}

module.exports = BookAppointmentController