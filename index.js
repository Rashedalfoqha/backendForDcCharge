const express = require("express");

const cors = require("cors");
require("dotenv").config();
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const PORT = process.env.PORT || 5000;
require("./models/dataBase");

app.use(cors());
app.use(express.json());
app.use(helmet());

// Middleware
app.use(express.urlencoded({ extended: true }));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/post", require("./routes/postNews"));
app.use("/api/services", require("./routes/productServices"));
app.use("/api/page-content", require("./routes/pageContentRoutes"));
app.use("/role", require("./routes/role"));
app.use("/brands", require("./routes/brand"));
app.use("/customers", require("./routes/Customers"));
app.use("/user", require("./routes/user"));

app.use((req, res) => res.status(404).json("NO content at this path"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
