const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({ status: "Backend is running 🚀" });
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/tasks", require("./routes/task.routes"));

app.use((err, req, res, next) => {
    console.error("[app] Unhandled error", err.message);
    res.status(err.status || 500).json({ message: err.message || "Internal server error" });
});

module.exports = app;