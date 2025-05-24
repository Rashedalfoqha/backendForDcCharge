const express = require("express");
const { createNewRole } = require("../controller/role");
const roleRouter = express.Router();
roleRouter.post("/", createNewRole);
module.exports = roleRouter;
