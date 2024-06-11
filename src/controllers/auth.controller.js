const { SuccessResponse, CREATED } = require("../core/success.response.js")
const AuthService = require("../services/auth.service.js")

class AuthController {
  static login = async (req, res) => {
    new SuccessResponse({
      message: "Login Success!",
      metadata: await AuthService.login(req.body),
    }).send(res)
  }
  static signup = async (req, res) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await AuthService.signup(req.body),
    }).send(res)
  }
  static logout = async (req, res) => {
    new SuccessResponse({
      message: "Logout Success!",
      metadata: await AuthService.logout(req.user),
    }).send(res)
  }
}

module.exports = AuthController
