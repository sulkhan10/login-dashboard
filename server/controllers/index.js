const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      let { username, email, password, gender } = req.body;
      console.log(req.body);
      let user = await User.create({
        username,
        email,
        password,
        gender,
      });
      res
        .status(201)
        .json({ username: user.username, email: user.email, role: user.role, gender: user.gender });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ where: { email } });

      if (!email || !password) {
        throw { name: "EmailOrPasswordRequired" };
      }

      if (!user) {
        throw { name: "InvalidCredentials" };
      }

      let isValid = await comparePassword(password, user.password);
      if (!isValid) {
        throw { name: "InvalidCredentials" };
      }
      let payload = {
        id: user.id,
        username: user.username,
        email: user.email,
        gender: user.gender,
      };
      let token = generateToken(payload);
      res
        .status(200)
        .json({
          access_token: token,
          username: user.username,
          gender: user.gender,
          userId: user.id,
        });
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = UserController;
