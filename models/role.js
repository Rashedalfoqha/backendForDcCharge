const mongoose = require("mongoose");
const newRole = new mongoose.Schema({
  role: { type: String },
  permissions: [{ type: String, required: true }],
});
module.exports = mongoose.model("Role", newRole);
