import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";

//
dotenv.config();
// app config
const app = express();
const PORT = 8080;

// middlewares
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// api routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server ruuning on PORT ${PORT}`);
});
