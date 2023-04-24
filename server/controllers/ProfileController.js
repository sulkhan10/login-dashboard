const { User } = require("../models");

class ProfileController {
  static async showProfile(req, res, next) {
    try {
      let { id } = req.user;
      let user = await User.findByPk(id);
      res.status(201).json({
        username: user.username,
        email: user.email,
        gender: user.gender,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
