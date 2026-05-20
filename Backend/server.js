import exp from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import userRoute from "./APIs/userapi.js";
import cors from "cors"
config();
const app = exp();

app.use(cors());
app.use(exp.json());

// user routes
app.use("/user-api", userRoute);

// Global error handler
app.use((err, req, res, next) => {

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }

  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  // Duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// invalid path handler
app.use((req, res) => {
  res.status(404).json({ message: "Invalid path" });
});

const connectDB = async () => {
  await connect(process.env.DB_URL);
  console.log("DB connected");

  app.listen(process.env.PORT, () =>
    console.log("Server running on port", process.env.PORT)
  );
};

connectDB();