const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/skywardens_cms";

  try {
    const conn = await mongoose.connect(mongoURI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`[MONGODB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MONGODB ERROR] Connection failed: ${error.message}`);
    console.error(`[MONGODB HINT] Ensure your MongoDB server is running at ${mongoURI}`);
    // Do not crash the entire server process so that the API can still respond with informative health checks
    return null;
  }
};

mongoose.connection.on("disconnected", () => {
  console.warn("[MONGODB] Warning: Database connection lost. Attempting to reconnect...");
});

mongoose.connection.on("reconnected", () => {
  console.log("[MONGODB] Reconnected to database.");
});

module.exports = connectDB;
