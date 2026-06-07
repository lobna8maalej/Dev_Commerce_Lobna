const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const printerRoutes = require("./routes/printerRoutes");

// API ROUTES
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/printers", printerRoutes);

// ================= MONGODB =================
mongoose
  .connect("mongodb://127.0.0.1:27017/stock_db")
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ Mongo error:", err);
  });

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🚀 Backend is running...");
});

// ================= SERVER =================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});