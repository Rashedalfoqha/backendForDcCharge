const usersModel = require("../models/userAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = (req, res) => {
  const { Email, password, role } = req.body;
  const newUser = new usersModel({
    Email,
    password,
    role,
  });
  newUser
    .save()

    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        account: result,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        // MongoDB duplicate key error
        res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Server error`,
          error: err.message,
        });
      }
    });
};
const login = (req, res) => {
  const { Email, password } = req.body;

  usersModel
    .findOne({ Email: Email.toLowerCase() })
    .populate("role")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: "The email doesn't exist or the password is incorrect",
        });
      }

      bcrypt.compare(password, result.password).then((match) => {
        if (!match) {
          return res.status(403).json({
            success: false,
            message: "The email doesn't exist or the password is incorrect",
          });
        }

        const payload = {
          userId: result._id,
          role: result.role,
        };

        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: "7d",
        });

        res.status(200).json({
          success: true,
          message: "Valid login credentials",
          token,
          userId: result._id,
          user: result,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

module.exports = {
  register,
  login,
};
