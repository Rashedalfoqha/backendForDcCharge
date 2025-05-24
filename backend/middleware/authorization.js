const jwt = require("jsonwebtoken");
const authorization = (string) => {
  return (req, res, next) => {
    const token = req.token;
    console.log(token);
    if (!token.role.permissions.includes(string)) {
      res.status(403).json({
        success: false,
        massage: "Unauthorized",
      });
    } else {
      next();
    }
  };
};
module.exports = authorization;
