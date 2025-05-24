const roleModel = require("../models/role");
const createNewRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roleModel({
    role,
    permissions,
  });
  newRole
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: err.message,
      });
    });
};
module.exports = { createNewRole };
