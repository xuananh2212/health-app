const { SuccessResponse, CREATED } = require("../core/success.response.js")
const UserService = require("../services/user.service");

class UserController {
  static getAllUsers = async (req,res) => {
    new SuccessResponse({
      message: "Get all users Success!",
      metadata: await UserService.getAllUsers(),
    }).send(res)
  }

  static getUserDetail = async (req, res) => {
    new SuccessResponse({
      message: "Get user detail Success!",
      metadata: await UserService.getUserDetail(),
    }).send(res)
  }
}

module.exports = UserController