require("dotenv").config();

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

// ================= API ROUTES =================
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/printers", printerRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    // ================= SERVER =================
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });
