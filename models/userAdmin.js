const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  Email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", index: true },
});
userSchema.pre("save", async function () {
  this.Email = this.Email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 7);
});
module.exports = mongoose.model("User", userSchema);
