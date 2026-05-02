const mongoose = require("mongoose");

const mongoUri = process.env.DB_URL;

if (!mongoUri) {
  console.error("❌ ERROR: DB_URL is NOT defined in environment variables!");
} else {
  console.log("✅ DB_URL is defined. Attempting to connect...");
}

// Connection pool and performance-friendly defaults
const mongooseOptions = {
  maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE || '20', 10),
  minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE || '5', 10),
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

mongoose
  .connect(mongoUri, mongooseOptions)
  .then(() => {
    console.log("DB Ready To Use");
  })
  .catch((err) => {
    console.error('Mongo connection error:', err && err.message);
  });
