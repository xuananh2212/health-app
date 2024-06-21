const { SuccessResponse, CREATED } = require("../core/success.response.js")
const AuthService = require("../services/auth.service.js")

class AuthController {
  static login = async (req, res) => {
    new SuccessResponse({
      message: "Login Success!",
      data: await AuthService.login(req.body),
    }).send(res)
  }
  static signup = async (req, res) => {
    new CREATED({
      message: "Registered OK!",
      data: await AuthService.signup(req.body),
    }).send(res)
  }
  static logout = async (req, res) => {
    new SuccessResponse({
      message: "Logout Success!",
      data: await AuthService.logout(req.body),
    }).send(res)
  }
}

module.exports = AuthController
