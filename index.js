const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
require("./models/dataBase");

app.use(cors());
app.use(express.json());

// Middleware
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/post", require("./routes/postNews"));
app.use("/api/services", require("./routes/productServices"));
app.use('/api/page-content', require('./routes/pageContentRoutes'));
app.use("/role", require("./routes/role"));
app.use("/brands", require("./routes/brand"));
app.use("/customers", require("./routes/Customers"));
app.use("/user", require("./routes/user"));



app.use((req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
