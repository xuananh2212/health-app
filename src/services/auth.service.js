const { BadRequestError, AuthFailureError } = require("../core/error.response")
const UserTransformer = require("../transformers/user.transformer")
const bcrypt = require("bcrypt")
const { User } = require("../models/index")

class AuthService {
  static login = async ({ email, password }) => {
    const findUser = await User.findOne({
      where: { email },
    })
    if (!findUser) {
      return {
        status:403,
        message: "Not found user!"
      }
    }
    const match = await bcrypt.compare(password, findUser.password)
    if (!match) {
      return {
        status:401,
        message: "UnAuthorization!"
      }
    }
    const userTransformer = new UserTransformer(findUser)
    return userTransformer;
  }

  static signup = async ({ name, email, password }) => {
    const user = await User.findOne({ where: { email } })
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
    const userTransformer = new UserTransformer(newUser)
    return userTransformer;
  }

  static logout = async () => {
  }
}

module.exports = AuthService
