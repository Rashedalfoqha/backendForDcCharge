const express = require("express");

const cors = require("cors");
const compression = require("compression");
require("dotenv").config();
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
app.set('etag', 'strong');
const PORT = process.env.PORT || 5000;
require("./models/dataBase");

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(helmet());
app.use(compression({ level: 6 }));

// custom sanitize: only body and params; do not touch req.query (read-only in Express 5)
function sanitizeObject(input) {
  if (!input || typeof input !== 'object') return input;
  if (Array.isArray(input)) return input.map(sanitizeObject);
  const output = {};
  for (const key of Object.keys(input)) {
    if (key.startsWith('$') || key.includes('.')) continue;
    const value = input[key];
    output[key] = typeof value === 'object' ? sanitizeObject(value) : value;
  }
  return output;
}

app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  if (req.params && typeof req.params === 'object') {
    req.params = sanitizeObject(req.params);
  }
  next();
});

// Middleware
// app.use(express.urlencoded({ extended: true }));
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use(limiter);

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  maxAge: '365d',
  immutable: true,
}));

// Basic cache headers for static assets and GET API responses
app.use((req, res, next) => {
  // Cache static assets longer
  if (req.url.startsWith('/uploads')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // Cache GET API responses briefly to relieve load (clients still control freshness)
  if (req.method === 'GET' && req.url.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'public, max-age=60');
    res.setHeader('Vary', 'Accept-Encoding');
  }
  next();
});

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
