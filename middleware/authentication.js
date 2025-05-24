const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Forbidden" });
  }
  const token = req.headers.authorization.split(" ").pop();
  try {
    const Token = await jwt.verify(token, process.env.SECRET);
    req.token = Token;
    console.log(token);
    next();
  } catch {
    res
      .status(401)
      .json({ success: false, message: "The token is invalid or expired" });
  }
};
module.exports=authentication