
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// =========================
// ROUTES
// =========================

const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const printerRoutes = require("./routes/printerRoutes");
const salesRoutes = require("./Routes/salesRoutes");
const settingsRoutes = require("./Routes/settingsRoutes");

// =========================
// API
// =========================

app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/printers", printerRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/settings", settingsRoutes);

// =========================
// TEST BACKEND
// =========================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running...",
  });
});

// =========================
// 404
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =========================
// DATABASE
// =========================

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:");
    console.error(error.message);
  });

