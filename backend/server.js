require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/config");

const authRoutes = require("./Routes/userRoutes");
const cartridgeRoutes = require("./Routes/cartridgeRoute");
const printerRoutes = require("./Routes/printRoute");

const app = express();
connectDB();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running");
});


app.use("/api/auth", authRoutes);
app.use("/api/cartridge", cartridgeRoutes);
app.use("/api/printers", printerRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});