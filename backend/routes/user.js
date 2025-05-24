const express = require("express");
const {
  register,
  login,
} = require("../controller/user");
const userRouter = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
userRouter.post("/reg", register);
userRouter.post("/login", login);
module.exports = userRouter; 