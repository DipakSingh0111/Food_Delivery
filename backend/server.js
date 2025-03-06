import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import foodRouter from "./routes/foodRoute.js";

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

app.listen(PORT, () => {
  console.log(`Server ruuning on PORT ${PORT}`);
});
