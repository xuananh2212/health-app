const { BadRequestError, AuthFailureError } = require("../core/error.response")
const bcrypt = require("bcrypt")
const { User } = require("../models/index")

class AuthService {
  static login = async () => {
  }

  static signup = async ({name, email, password}) => {
    const user = await User.findOne({ where: { email, provider: null } })
    if (user) {
      throw new BadRequestError("Error: Account already registered!")
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      status: 'active'
    })
    return newUser
  }

  static logout = async () => {
  }
}

module.exports = AuthService
